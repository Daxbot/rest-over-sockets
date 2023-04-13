## Classes

<dl>
<dt><a href="#ROSApp">ROSApp</a></dt>
<dd><p>ROSApp</p>
<p>Approximately an express app</p>
</dd>
<dt><a href="#ROSClient">ROSClient</a></dt>
<dd><p>ROSClient for sockhop</p>
<p>This is a nice wrapper for sockhop clients(sessions) which
will allow them to make requests to servers(clients) that
are hosting ROSApps more easily.</p>
</dd>
<dt><a href="#ROSRequest">ROSRequest</a></dt>
<dd><p>ROSRequest</p>
</dd>
<dt><a href="#ROSResponse">ROSResponse</a></dt>
<dd><p>ROSResponse</p>
<p>Approximately the same as an express Response object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#requestHandler">requestHandler</a> : <code>function</code></dt>
<dd><p>requestHandler(req, response)</p>
</dd>
<dt><a href="#middlewareHandler">middlewareHandler</a> : <code>function</code></dt>
<dd><p>middlewareHandler(req, response, next)</p>
</dd>
<dt><a href="#responseHandler">responseHandler</a> : <code>function</code></dt>
<dd><p>responseHandler(response)</p>
</dd>
<dt><a href="#ROSRequestObject">ROSRequestObject</a> : <code>object</code></dt>
<dd><p>Global definition of request object</p>
<p>The ROSApp will respect requests that conform to this format,
though, if you are using sockhop, you are encouraged to actually
send the ROSRequest instance (no just the serialized version).</p>
</dd>
<dt><a href="#ROSResponseObject">ROSResponseObject</a> : <code>object</code></dt>
<dd><p>Global definition of response object</p>
<p>This is what will be returned with to the requester.</p>
</dd>
</dl>

<a name="ROSApp"></a>

## ROSApp
ROSApp

Approximately an express app

**Kind**: global class  

* [ROSApp](#ROSApp)
    * [new ROSApp()](#new_ROSApp_new)
    * [.receive(data, callback)](#ROSApp+receive) ⇒ [<code>Proimse.&lt;ROSResponse&gt;</code>](#ROSResponse)
    * [.put(path, handler)](#ROSApp+put) ⇒ <code>this</code>
    * [.delete(path, handler)](#ROSApp+delete) ⇒ <code>this</code>
    * [.post(path, handler)](#ROSApp+post) ⇒ <code>this</code>
    * [.get(path, handler)](#ROSApp+get) ⇒ <code>this</code>
    * [.patch(path, handler)](#ROSApp+patch) ⇒ <code>this</code>
    * [.use(path, handler)](#ROSApp+use) ⇒ <code>this</code>

<a name="new_ROSApp_new"></a>

### new ROSApp()
Constructor

<a name="ROSApp+receive"></a>

### rosApp.receive(data, callback) ⇒ [<code>Proimse.&lt;ROSResponse&gt;</code>](#ROSResponse)
Receive

Call this when new data has been received for processing

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: [<code>Proimse.&lt;ROSResponse&gt;</code>](#ROSResponse) - Resolves to the ROSResponse that was sent (probably -- unless someone forgot to .send in their handler)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | the received data from the client (do not pass a string, de/encoding is your responsibility) |
| callback | [<code>responseHandler</code>](#responseHandler) |  |

<a name="ROSApp+put"></a>

### rosApp.put(path, handler) ⇒ <code>this</code>
PUT

Add a route handler for PUT on a given path

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSApp+delete"></a>

### rosApp.delete(path, handler) ⇒ <code>this</code>
DELETE

Add a route handler for DELETE on a given path

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSApp+post"></a>

### rosApp.post(path, handler) ⇒ <code>this</code>
POST

Add a route handler for POST on a given path

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSApp+get"></a>

### rosApp.get(path, handler) ⇒ <code>this</code>
GET

Add a route handler for GET on a given path

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSApp+patch"></a>

### rosApp.patch(path, handler) ⇒ <code>this</code>
PATCH

Add a route handler for PATCH on a given path

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSApp+use"></a>

### rosApp.use(path, handler) ⇒ <code>this</code>
Use

Add a middleware handler on a path (and all paths below)

**Kind**: instance method of [<code>ROSApp</code>](#ROSApp)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>middlewareHandler</code>](#middlewareHandler) | the request handler |

<a name="ROSClient"></a>

## ROSClient
ROSClient for sockhop

This is a nice wrapper for sockhop clients(sessions) which
will allow them to make requests to servers(clients) that
are hosting ROSApps more easily.

**Kind**: global class  

* [ROSClient](#ROSClient)
    * [new ROSClient(controller)](#new_ROSClient_new)
    * _instance_
        * [.$(obj, [opts])](#ROSClient+$) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
        * [.get(path, [headers])](#ROSClient+get) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
        * [.delete(path, [headers])](#ROSClient+delete) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
        * [.post(path, [body], [headers])](#ROSClient+post) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
        * [.put(path, [body], [headers])](#ROSClient+put) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
        * [.patch(path, [body], [headers])](#ROSClient+patch) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
    * _static_
        * [.sockhop(sockhop)](#ROSClient.sockhop)
        * [.socketio(io)](#ROSClient.socketio)

<a name="new_ROSClient_new"></a>

### new ROSClient(controller)
Constructor


| Param | Type |
| --- | --- |
| controller | <code>Controller</code> | 

<a name="ROSClient+$"></a>

### rosClient.$(obj, [opts]) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
Make a request

**Kind**: instance method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  |  |
| obj.method | <code>string</code> |  |  |
| obj.path | <code>string</code> |  |  |
| obj.body | <code>object</code> |  |  |
| obj.headers | <code>object</code> |  | Note, unlike express, these are case-sensitive. |
| [opts] | <code>object</code> | <code>{}</code> | Options to pass to the underlying controller |

<a name="ROSClient+get"></a>

### rosClient.get(path, [headers]) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
Make a GET request

**Kind**: instance method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type | Default |
| --- | --- | --- |
| path | <code>string</code> |  | 
| [headers] | <code>object</code> | <code>{}</code> | 

<a name="ROSClient+delete"></a>

### rosClient.delete(path, [headers]) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
Make a DELETE request

**Kind**: instance method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type | Default |
| --- | --- | --- |
| path | <code>string</code> |  | 
| [headers] | <code>object</code> | <code>{}</code> | 

<a name="ROSClient+post"></a>

### rosClient.post(path, [body], [headers]) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
Make a POST request

**Kind**: instance method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type | Default |
| --- | --- | --- |
| path | <code>string</code> |  | 
| [body] | <code>object</code> | <code>{}</code> | 
| [headers] | <code>object</code> | <code>{}</code> | 

<a name="ROSClient+put"></a>

### rosClient.put(path, [body], [headers]) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
Make a PUT request

**Kind**: instance method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type | Default |
| --- | --- | --- |
| path | <code>string</code> |  | 
| [body] | <code>object</code> | <code>{}</code> | 
| [headers] | <code>object</code> | <code>{}</code> | 

<a name="ROSClient+patch"></a>

### rosClient.patch(path, [body], [headers]) ⇒ [<code>Promise.&lt;ROSResponseObject&gt;</code>](#ROSResponseObject)
Make a PATCH request

**Kind**: instance method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type | Default |
| --- | --- | --- |
| path | <code>string</code> |  | 
| [body] | <code>object</code> | <code>{}</code> | 
| [headers] | <code>object</code> | <code>{}</code> | 

<a name="ROSClient.sockhop"></a>

### ROSClient.sockhop(sockhop)
Create a new Sockhop-based ROSClient

**Kind**: static method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type |
| --- | --- |
| sockhop | <code>Sockhop.client</code> \| <code>Sockhop.session</code> | 

<a name="ROSClient.socketio"></a>

### ROSClient.socketio(io)
Create a new socket.io-based ROSClient

**Kind**: static method of [<code>ROSClient</code>](#ROSClient)  

| Param | Type |
| --- | --- |
| io | <code>socketio.socket</code> | 

<a name="ROSRequest"></a>

## ROSRequest
ROSRequest

**Kind**: global class  

* [ROSRequest](#ROSRequest)
    * [new ROSRequest(obj)](#new_ROSRequest_new)
    * _instance_
        * [.path](#ROSRequest+path) : <code>string</code>
        * [.method](#ROSRequest+method) : <code>string</code>
        * [.get(key)](#ROSRequest+get) ⇒ <code>string</code>
        * [.setHeader(key, value)](#ROSRequest+setHeader) ⇒ <code>this</code>
        * [.getHeader(key)](#ROSRequest+getHeader) ⇒ <code>string</code>
        * [.hasHeader(key)](#ROSRequest+hasHeader) ⇒ <code>boolean</code>
        * [.toJSON()](#ROSRequest+toJSON) ⇒ [<code>ROSRequestObject</code>](#ROSRequestObject)
    * _static_
        * [.parse(obj)](#ROSRequest.parse) ⇒ [<code>ROSRequest</code>](#ROSRequest)

<a name="new_ROSRequest_new"></a>

### new ROSRequest(obj)
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  |  |
| [obj.path] | <code>string</code> | <code>null</code> |  |
| [obj.method] | <code>string</code> | <code>null</code> |  |
| [obj.headers] | <code>object</code> |  | if an object, the keys will be forced to lower case (a. la. express.js) |
| [obj.body] | <code>object</code> |  |  |

<a name="ROSRequest+path"></a>

### rosRequest.path : <code>string</code>
The request path

**Kind**: instance property of [<code>ROSRequest</code>](#ROSRequest)  
<a name="ROSRequest+method"></a>

### rosRequest.method : <code>string</code>
The request method

Must be one of: GET, POST, PUT, PATCH, DELETE.

Automatically converted to lower case.

**Kind**: instance property of [<code>ROSRequest</code>](#ROSRequest)  
<a name="ROSRequest+get"></a>

### rosRequest.get(key) ⇒ <code>string</code>
Get a header from a key (alias for .getHeader() c.f. express)

**Kind**: instance method of [<code>ROSRequest</code>](#ROSRequest)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |

<a name="ROSRequest+setHeader"></a>

### rosRequest.setHeader(key, value) ⇒ <code>this</code>
Set a header to value

**Kind**: instance method of [<code>ROSRequest</code>](#ROSRequest)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |
| value | <code>string</code> | the value of the header |

<a name="ROSRequest+getHeader"></a>

### rosRequest.getHeader(key) ⇒ <code>string</code>
Get a header from a key

**Kind**: instance method of [<code>ROSRequest</code>](#ROSRequest)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |

<a name="ROSRequest+hasHeader"></a>

### rosRequest.hasHeader(key) ⇒ <code>boolean</code>
Check if a header exists

**Kind**: instance method of [<code>ROSRequest</code>](#ROSRequest)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |

<a name="ROSRequest+toJSON"></a>

### rosRequest.toJSON() ⇒ [<code>ROSRequestObject</code>](#ROSRequestObject)
Custom JSON stringify method

**Kind**: instance method of [<code>ROSRequest</code>](#ROSRequest)  
<a name="ROSRequest.parse"></a>

### ROSRequest.parse(obj) ⇒ [<code>ROSRequest</code>](#ROSRequest)
Parse an object as a ROSRequest

**Kind**: static method of [<code>ROSRequest</code>](#ROSRequest)  

| Param | Type |
| --- | --- |
| obj | [<code>ROSRequestObject</code>](#ROSRequestObject) | 

<a name="ROSResponse"></a>

## ROSResponse
ROSResponse

Approximately the same as an express Response object

**Kind**: global class  

* [ROSResponse](#ROSResponse)
    * [new ROSResponse(obj)](#new_ROSResponse_new)
    * _instance_
        * [.toJSON()](#ROSResponse+toJSON) ⇒ [<code>ROSResponseObject</code>](#ROSResponseObject)
        * [.error(title, opts)](#ROSResponse+error) ⇒ <code>this</code>
        * [.end()](#ROSResponse+end) ⇒ <code>this</code>
        * [.get(key)](#ROSResponse+get) ⇒ <code>string</code>
        * [.set(key, value)](#ROSResponse+set) ⇒ <code>this</code>
        * [.status(status)](#ROSResponse+status) ⇒ <code>this</code>
        * [.json([data])](#ROSResponse+json) ⇒ <code>this</code>
        * [.send([data])](#ROSResponse+send) ⇒ <code>this</code>
        * [.sendStatus(code)](#ROSResponse+sendStatus) ⇒ <code>this</code>
        * [.setHeader(key, value)](#ROSResponse+setHeader) ⇒ <code>this</code>
        * [.getHeader(key)](#ROSResponse+getHeader) ⇒ <code>string</code>
        * [.hasHeader(key)](#ROSResponse+hasHeader) ⇒ <code>boolean</code>
    * _static_
        * [.new(cb)](#ROSResponse.new) ⇒ [<code>ROSResponse</code>](#ROSResponse)

<a name="new_ROSResponse_new"></a>

### new ROSResponse(obj)
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>object</code> |  |  |
| [obj.statusCode] | <code>number</code> | <code>200</code> | the HTTP status code |
| obj.headers | <code>object</code> |  | any header information (NOTE will be lower cased) |
| [obj.data] | <code>object</code> |  |  |
| [obj.callback] | [<code>responseHandler</code>](#responseHandler) | <code>()&#x3D;&gt;{}</code> |  |
| [obj.sent] | <code>boolean</code> | <code>false</code> |  |

<a name="ROSResponse+toJSON"></a>

### rosResponse.toJSON() ⇒ [<code>ROSResponseObject</code>](#ROSResponseObject)
Custom JSON stringify method

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
<a name="ROSResponse+error"></a>

### rosResponse.error(title, opts) ⇒ <code>this</code>
Add error

Error will appear in response as JSON API https://jsonapi.org/
Setting an error will also delete any data you have assigned and reset the HTTP response code

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Returns**: <code>this</code> - this for easy stacking  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| title | <code>string</code> |  | the title of the error |
| opts | <code>object</code> |  | the options |
| [opts.status] | <code>number</code> | <code>500</code> | the new HTTP response status |
| [opts.detail] | <code>string</code> |  | details of this error |

<a name="ROSResponse+end"></a>

### rosResponse.end() ⇒ <code>this</code>
End the response  quickly

Basically this sends with no data, otherwise
use `.send()`

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
<a name="ROSResponse+get"></a>

### rosResponse.get(key) ⇒ <code>string</code>
Get a header from a key (alias for .getHeader() c.f. express)

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the name of the header |

<a name="ROSResponse+set"></a>

### rosResponse.set(key, value) ⇒ <code>this</code>
Add/set header (alias for .setHeader() c.f. express)

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Returns**: <code>this</code> - this for easy stacking  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | the name of the header |
| value | <code>string</code> | the value of the header |

<a name="ROSResponse+status"></a>

### rosResponse.status(status) ⇒ <code>this</code>
Set status

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Returns**: <code>this</code> - this for easy stacking  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>number</code> | the HTTP status code to use |

<a name="ROSResponse+json"></a>

### rosResponse.json([data]) ⇒ <code>this</code>
Send a "json" (actually the object) response.

This is really just a wrapper for `.send({ ... })`,
but is also ensure the correct content type.

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Throws**:

- <code>Error</code> error if you call this more than once


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code></code> | Optional json-style object |

<a name="ROSResponse+send"></a>

### rosResponse.send([data]) ⇒ <code>this</code>
Send

Send the response.  You can only call this once.

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Throws**:

- <code>Error</code> error if you call this more than once


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>\*</code> | Optional data to attach |

<a name="ROSResponse+sendStatus"></a>

### rosResponse.sendStatus(code) ⇒ <code>this</code>
Send a status code with the name as the body

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>number</code> | http status code |

<a name="ROSResponse+setHeader"></a>

### rosResponse.setHeader(key, value) ⇒ <code>this</code>
Set a header to value

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |
| value | <code>string</code> | the value of the header |

<a name="ROSResponse+getHeader"></a>

### rosResponse.getHeader(key) ⇒ <code>string</code>
Get a header from a key

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |

<a name="ROSResponse+hasHeader"></a>

### rosResponse.hasHeader(key) ⇒ <code>boolean</code>
Check if a header exists

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | NOTE: this will be forced to lower case |

<a name="ROSResponse.new"></a>

### ROSResponse.new(cb) ⇒ [<code>ROSResponse</code>](#ROSResponse)
Create a new ROSResponse

**Kind**: static method of [<code>ROSResponse</code>](#ROSResponse)  

| Param | Type |
| --- | --- |
| cb | [<code>responseHandler</code>](#responseHandler) | 

<a name="requestHandler"></a>

## requestHandler : <code>function</code>
requestHandler(req, response)

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| req | [<code>ROSRequest</code>](#ROSRequest) | the request object |
| response | [<code>ROSResponse</code>](#ROSResponse) | the response you are sending to the client |

<a name="middlewareHandler"></a>

## middlewareHandler : <code>function</code>
middlewareHandler(req, response, next)

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| req | [<code>ROSRequest</code>](#ROSRequest) | the request object |
| response | [<code>ROSResponse</code>](#ROSResponse) | the response you are sending to the client |
| next | <code>function</code> | the callback to trigger the "next" route |

<a name="responseHandler"></a>

## responseHandler : <code>function</code>
responseHandler(response)

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| response | [<code>ROSResponse</code>](#ROSResponse) | the response that should be sent back to the client |

<a name="ROSRequestObject"></a>

## ROSRequestObject : <code>object</code>
Global definition of request object

The ROSApp will respect requests that conform to this format,
though, if you are using sockhop, you are encouraged to actually
send the ROSRequest instance (no just the serialized version).

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | the requested path |
| method | <code>string</code> |  | GET, PUT, POST, etc |
| headers | <code>object</code> |  | any header information, like 'content-type' (NOTE: these will be lower-cased to match express/nodejs paradigm) |
| [params] | <code>object</code> | <code>{}</code> | any parameters captured from the path (i.e. `{ id: "15" }` for '/api/user/15') |
| [query] | <code>object</code> | <code>{}</code> | an query parameters parsed from the path's query section (i.e. `{ limit:"15" }` for '/api/users?limit=15') |
| body | <code>object</code> |  | an optional body (for POST/PUT/PATCH) |

<a name="ROSResponseObject"></a>

## ROSResponseObject : <code>object</code>
Global definition of response object

This is what will be returned with to the requester.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| statusCode | <code>number</code> |  |
| headers | <code>object</code> | any header information, like 'content-type' (NOTE the key values will be lower-cased to match express/nodejs paradigm) |
| data | <code>object</code> |  |

