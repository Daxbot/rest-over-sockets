
const http = require('http');
const { Server:IOServer } = require('socket.io');

const server = http.createServer();
server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});

const io = new IOServer(server);
const restos=new (require("../../"))();

// Set up a server
io.on("connection", (sock)=>{
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
