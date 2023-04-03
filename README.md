# REST-over-sockets

REST API over (Web)sockets using an [Express](https://www.npmjs.com/package/express) style interface

- 100% native javascript
- Compatible with [Websockets](https://www.npmjs.com/package/ws), [Sockhop](https://www.npmjs.com/package/sockhop) and [socket.io](socket.io)
- Uses express-style controller declarations (see [Asseverate](https://github.com/jonathanvanschenck/asseverate) if you want to write rest-over-sockets- and express-compatible controllers)
- Supports parameter capture, automatic error handling, and response encoding 


## Why

You have an application whose only clients connect directly over TCP/IP
**or**
your clients all support Websockets/socket.io
**and**  
you don't see the point in programming multiple API endpoints - some REST over HTTP, some over Websockets.

## Details
Check out the [full documentation here](API.md)


### Request
Incoming requests are simple native `object`, presumably transmitted over the wire using JSON.  You can do this yourself, or you can use a library like [Sockhop](https://www.npmjs.com/package/sockhop "Sockhop on NPM") or [socket.io](socket.io) -- depending on if you are in browser or not.


| Parameter | Type    | Example                                | Required | Notes                                                  |
|-----------|---------|----------------------------------------|----------|--------------------------------------------------------|
| method    | string  | "POST"                                 | Y        |                                                        |
| path      | string  | "/photos/cat.jpg"                      | Y        |                                                        |
| header    | ?object | { "Content-Type": "application/json" } | N        |                                                        |
| body      | ?object | { "some": "data" }                     | N        |                                                        |
| {...}     | any     |                                        | N        | User managed, passed to handler                        |
| params    | object  | { id: 23 }                             |          |  RESERVED - auto populated from URL capture parameters |

```json
{
    "method": "GET",
    "path": "/apple/3444"
}
```

## Response
If your handler throws an exception, the error will automatically result in a HTTP style `500` response.  Routes that don't exist return a HTTP style `404` error.
```json
{
    "status": 200,
    "headers": {
        "Content-Type": "text/json"
    },
    "data": [
        {
            "type": "Apple",
            "id": "23",
            "attributes": {
                "flavor": "sweet"
            }
        }
    ]
}
```

## Examples
Checkout the `examples` folder for the source code:
### Raw Websockets
#### Server using (raw) Websockets
```javascript
const wss=new (require("ws")).Server({ port: 8080 });
const restos=new (require("rest-over-sockets"))();

// Set up a server
wss.on("connection", (ws)=>{

  ws.on("message", (message)=> {

    restos.receive(JSON.parse(message),(response)=>{

      ws.send(JSON.stringify(response));
    });
  });
});
 
// Add an Express-style route
restos.get("/widget/:id", (req, res)=>{

    res
      .set('Content-Type', 'text/json')
        .status(200)
        .data("Apple", req.params.id, { flavor: "sweet" })
        .send();  
});
```
#### Client using (raw) Websockets
```javascript
const ws= new (require("ws"))("ws://localhost:8080/");

ws.on("open", ()=>{

  ws.send(JSON.stringify({

    method : "GET",
    path : "/widget/23"

  }));
});

ws.on("message", (data)=>{

  console.log(data);  // {"status":200,"headers":{"Content-Type":"text/json"},"data":[{"type":"Apple","id":"23","attributes":{"flavor":"sweet"}}]}
  ws.close();
});
```
Of course, Websockets has it's limitations, and so these days lots of people are using [socket.io](socket.io) as a nice abstraction layer to handle these details. Rest-over-sockets integrates nicely into your pre-existing socket.io infastructure

### Socket.io
#### Server using socket.io
```javascript
const http = require('http');
const { Server:IOServer } = require('socket.io');

const server = http.createServer();
server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});

const io = new IOServer(server);
const restos=new (require("rest-over-sockets"))();

// Set up a server
io.on("connection", (sock)=>{
    // Request will be emitted on "ROSRequest" by the ROSClient
    sock.on("ROSRequest", (msg, callback)=> {
        console.log("Received message", msg);
        restos.receive(msg,callback);
    });
});
 
// Add an Express-style route
restos.get("/widget/:id", (req, res)=>{
    res
    .set('Content-Type', 'text/json')
    .status(200)
    .data("Apple", req.params.id, { flavor: "sweet" })
    .send();    
});
```
#### Client using socket.io
```javascript
const { ROSClient } = require("rest-over-sockets");
const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');
const client = ROSClient.socketio(socket);

socket.on("connect", ()=>{
    client.get("/widget/3444").then(response=>{
        console.log(`Response: ${JSON.stringify(response)}`);
        socket.disconnect();
    });
});
```

Socket.io is great, but sometimes you are using native (i.e. tcp or unix) sockets, In that case: try Sockhop, since it will automatically handle reconnections, remote callbacks to ensure the response is given to the request that called it, and also JSON encoding and possible packetization / fragmentation across the wire. Basically, it fixes all the nasty edge-cases of raw tcp sockets so that you can just focus on the real work of writing the interface.

### Sockhop
#### Server using Sockhop callbacks (old-style)
```javascript
const server=new (require("sockhop").server)();
const restos=new (require("rest-over-sockets"))();

server.listen();
// Assume everything that comes over the wire is a ROSRequest
server.on("receive", (o, meta)=>restos.receive(o, meta.callback));

restos.get("/apple/:id", (req, res)=>{
    res
      .set('Content-Type', 'text/json')
        .status(200)
        .data("Apple", req.params.id, { flavor: "sweet" })
        .send();  
});
```
#### Client using Sockhop callbacks (old-style)
```javascript
const client=new (require("sockhop").client)();

client.connect().then(()=>{

  client.send({
    method: "GET",
    path: "/apple/3444"
  },(response)=>{

    console.log(`Response: ${JSON.stringify(response)}`);
    client.disconnect();
  });
});
```

#### Server using Sockhop requests (new-style)
```javascript
const server=new (require("sockhop").server)();
const restos=new (require("rest-over-sockets"))();

server.listen();
server.on("request", (req,res,meta)=> {
    // Request will be sent as a "ROSRequest" type by the ROSClient
    if ( req.type !== "ROSRequest" ) return; // ignore other types
    restos.receive(req.data, (obj) => res.send(obj))
});

restos.get("/apple/:id", (req, res)=>{
    res
      .set('Content-Type', 'text/json')
        .status(200)
        .data("Apple", req.params.id, { flavor: "sweet" })
        .send();  
});
```
#### Client using Sockhop requests (new-style)
```javascript
const { ROSClient } = require("rest-over-sockets");
const sock=new (require("sockhop").client)();
const client = ROSClient.sockhop(sock);

sock.connect().then(()=>{
    return client.get("/apple/3444")
}).then(response => {
    console.log(`Response: ${JSON.stringify(response)}`);
    sock.disconnect();
});
```

## Notes

Make sure your handlers (added by calling ```.get()```, ```.post()```, etc) run asynchronously.  Example:
```
// BAD!
restos.get("/some/path", (req, res)=>{
  
    NASTY_BLOCKING_TASK();

    /* ... */

    res.send();  
});


// GOOD
restos.get("/some/path", (req, res)=>{
  
    return new Promise((resolve)=>{

      NASTY_BLOCKING_TASK();

      /* ... */

      resolve();
    })
    .then(res.send);
});

```

## TODO
  - Add cookie support?
  - Support streaming?
  - Support more content types?
  - Default 404 and 500 message types

## License
MIT
