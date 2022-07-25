## Classes

<dl>
<dt><a href="#ROSResponse">ROSResponse</a></dt>
<dd><p>ROSResponse</p>
<p>Approximately the same as an express Response object</p>
</dd>
<dt><a href="#ROSServer">ROSServer</a></dt>
<dd><p>ROSServer</p>
<p>Approximately an express app</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ROSRequest">ROSRequest</a> : <code>object</code></dt>
<dd><p>Global definition of ROSRequest object</p>
</dd>
<dt><a href="#requestHandler">requestHandler</a> : <code>function</code></dt>
<dd><p>requestHandler(req, response)</p>
</dd>
<dt><a href="#responseHandler">responseHandler</a> : <code>function</code></dt>
<dd><p>responseHandler(response)</p>
</dd>
</dl>

<a name="ROSResponse"></a>

## ROSResponse
ROSResponse

Approximately the same as an express Response object

**Kind**: global class  

* [ROSResponse](#ROSResponse)
    * [new ROSResponse([status], [content_type])](#new_ROSResponse_new)
    * [.callback](#ROSResponse+callback) : [<code>responseHandler</code>](#responseHandler)
    * [.send()](#ROSResponse+send) ⇒ <code>this</code>
    * [.data(type, id, attributes)](#ROSResponse+data) ⇒ <code>this</code>
    * [.status(status)](#ROSResponse+status) ⇒ <code>this</code>
    * [.set(name, value)](#ROSResponse+set) ⇒ <code>this</code>
    * [.error(title, opts)](#ROSResponse+error) ⇒ <code>this</code>

<a name="new_ROSResponse_new"></a>

### new ROSResponse([status], [content_type])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [status] | <code>number</code> | <code>200</code> | the HTTP status code |
| [content_type] | <code>string</code> | <code>&quot;&#x27;text/json&#x27;&quot;</code> | the content type to use |

<a name="ROSResponse+callback"></a>

### rosResponse.callback : [<code>responseHandler</code>](#responseHandler)
Response callback handler

**Kind**: instance property of [<code>ROSResponse</code>](#ROSResponse)  
<a name="ROSResponse+send"></a>

### rosResponse.send() ⇒ <code>this</code>
Send

Send the response.  You can only call this once.

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Throws**:

- <code>Error</code> error if you call this more than once

<a name="ROSResponse+data"></a>

### rosResponse.data(type, id, attributes) ⇒ <code>this</code>
Add data item to response

Follows JSON API https://jsonapi.org/

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Returns**: <code>this</code> - this for easy stacking  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | the type of the item, e.g. "Dog" |
| id | <code>number</code> | the id of the item, e.g. 23 |
| attributes | <code>object</code> | the actual object data |

<a name="ROSResponse+status"></a>

### rosResponse.status(status) ⇒ <code>this</code>
Set status

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Returns**: <code>this</code> - this for easy stacking  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>number</code> | the HTTP status code to use |

<a name="ROSResponse+set"></a>

### rosResponse.set(name, value) ⇒ <code>this</code>
Add/set header

Like similar Express response

**Kind**: instance method of [<code>ROSResponse</code>](#ROSResponse)  
**Returns**: <code>this</code> - this for easy stacking  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the header |
| value | <code>string</code> | the value of the header |

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

<a name="ROSServer"></a>

## ROSServer
ROSServer

Approximately an express app

**Kind**: global class  

* [ROSServer](#ROSServer)
    * [new ROSServer()](#new_ROSServer_new)
    * [.put(path, handler)](#ROSServer+put) ⇒ <code>this</code>
    * [.delete(path, handler)](#ROSServer+delete) ⇒ <code>this</code>
    * [.post(path, handler)](#ROSServer+post) ⇒ <code>this</code>
    * [.get(path, handler)](#ROSServer+get) ⇒ <code>this</code>
    * [.patch(path, handler)](#ROSServer+patch) ⇒ <code>this</code>
    * [.receive(data, callback)](#ROSServer+receive) ⇒ [<code>ROSResponse</code>](#ROSResponse)

<a name="new_ROSServer_new"></a>

### new ROSServer()
Constructor

<a name="ROSServer+put"></a>

### rosServer.put(path, handler) ⇒ <code>this</code>
PUT

Add a route handler for PUT on a given path

**Kind**: instance method of [<code>ROSServer</code>](#ROSServer)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSServer+delete"></a>

### rosServer.delete(path, handler) ⇒ <code>this</code>
DELETE

Add a route handler for DELETE on a given path

**Kind**: instance method of [<code>ROSServer</code>](#ROSServer)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSServer+post"></a>

### rosServer.post(path, handler) ⇒ <code>this</code>
POST

Add a route handler for POST on a given path

**Kind**: instance method of [<code>ROSServer</code>](#ROSServer)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSServer+get"></a>

### rosServer.get(path, handler) ⇒ <code>this</code>
GET

Add a route handler for GET on a given path

**Kind**: instance method of [<code>ROSServer</code>](#ROSServer)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSServer+patch"></a>

### rosServer.patch(path, handler) ⇒ <code>this</code>
PATCH

Add a route handler for PATCH on a given path

**Kind**: instance method of [<code>ROSServer</code>](#ROSServer)  
**Returns**: <code>this</code> - this a reference to ourselves, for ease in stacking  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | the URL path.  Supports parameter capture, like "/dogs/:id/name" |
| handler | [<code>requestHandler</code>](#requestHandler) | the request handler |

<a name="ROSServer+receive"></a>

### rosServer.receive(data, callback) ⇒ [<code>ROSResponse</code>](#ROSResponse)
Receive

Call this when new data has been received for processing

**Kind**: instance method of [<code>ROSServer</code>](#ROSServer)  
**Returns**: [<code>ROSResponse</code>](#ROSResponse) - ROSResponse that was (or will be) sent - caution, this happens asynchronously so the ROSResponse may still be changing when you get it back  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | the received data from the client (do not pass a string, de/encoding is your responsibility) |
| callback | [<code>responseHandler</code>](#responseHandler) |  |

<a name="ROSRequest"></a>

## ROSRequest : <code>object</code>
Global definition of ROSRequest object

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | the captured parameters, see https://www.npmjs.com/package/route-parser |
| path | <code>string</code> | the requested path |
| method | <code>string</code> | GET, PUT, POST, etc |

<a name="requestHandler"></a>

## requestHandler : <code>function</code>
requestHandler(req, response)

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| req | [<code>ROSRequest</code>](#ROSRequest) | the request object |
| response | [<code>ROSResponse</code>](#ROSResponse) | the response you are sending to the client |

<a name="responseHandler"></a>

## responseHandler : <code>function</code>
responseHandler(response)

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| response | [<code>ROSResponse</code>](#ROSResponse) | the response that should be sent back to the client |

