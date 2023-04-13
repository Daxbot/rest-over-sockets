
/**
 * Global definition of response object
 *
 * This is what will be returned with to the requester.
 *
 * @typedef ROSResponseObject
 * @type {object}
 * @property {number} status
 * @property {object} headers
 * @property {?object} data
 * @property {?object} errors
 */


/**
 * ROSResponse
 *
 * Approximately the same as an express Response object
 */
class ROSResponse {

    /**
     * Constructor
     *
     * @param {number} [status=200] the HTTP status code
     * @param {string} [content_type='application/json'] the content type to use
     */
    constructor(status=200, content_type="application/json") {

        this.payload={
            status : status,
            headers : {
                "Content-Type": content_type
            }
        };

        this._callback=()=>{};   // No-op, will be replaced
    }

    // -----------------------------------------------
    //     Custom Methods
    // -----------------------------------------------

    /**
     * Flag indicating if the response has been "sent" already
     *
     * @type {boolean}
     */
    get sent() {
        return !this._callback;
    }

    /**
     * Response callback handler
     *
     * This gets given the response payload to send over the wire
     *
     * @type {responseHandler}
     */
    get callback() {
        return this._callback;
    }
    set callback(cb) {
        this._callback=cb;
    }

    /**
     * Add data item to response
     *
     * Follows JSON API https://jsonapi.org/
     *
     * @param {string} type the type of the item, e.g. "Dog"
     * @param {number} id the id of the item, e.g. 23
     * @param {object} attributes the actual object data
     * @returns {this} this for easy stacking
     */
    data(type, id, attributes) {

        if(!this.payload.data) this.payload.data=[];

        this.payload.data.push({
            type: type,
            id: id,
            attributes: { ... attributes}

        });
        return this;
    }

    /**
     * Add error
     *
     * Error will appear in response as JSON API https://jsonapi.org/
     * Setting an error will also delete any data you have assigned and reset the HTTP response code
     *
     * @param {string} title the title of the error
     * @param {object} opts the options
     * @param {number} [opts.status=500] the new HTTP response status
     * @param {string} [opts.detail] details of this error
     * @returns {this} this for easy stacking
     */
    error(title, opts={}) {

        // Set default options
        Object.assign({detail: "", status: 500}, opts);

        // Clear data
        delete this.payload.data;

        // Set error
        if(!this.payload.errors) this.payload.errors=[];
        this.payload.errors.push({

            title:    title,
            detail: opts.detail
        });

        // Set status
        this.payload.status=opts.status;

        return this;
    }

    // -----------------------------------------------
    //     Express-esk Methods
    // -----------------------------------------------

    /**
     * End the response  quickly
     *
     * Basically this sends with no data, otherwise
     * use `.send()`
     *
     * @returns {this}
     */
    end() {
        return this.send(undefined);
    }

    /**
     * get header
     *
     * NOTE : this is case-sensitive
     *
     * @param {string} name the name of the header
     * @returns {string}
     */
    get(name){
        return this.payload.headers[name];
    }

    /**
     * Send a "json" (actually the object) response.
     *
     * This is really just a wrapper for `.send({ ... })`,
     * but is also ensure the correct content type.
     *
     * @param {*} [data=null] Optional json-style object
     * @throws {Error} error if you call this more than once
     * @returns {this}
     */
    json(data=null) {
        this.set("Content-Type","application/json");
        return this.send(data);
    }

    /**
     * Send
     *
     * Send the response.  You can only call this once.
     *
     * @param {*} [data=null] Optional data to attach
     * @throws {Error} error if you call this more than once
     * @returns {this}
     */
    send(data=null) {

        if ( this.sent ) throw new Error("ROSResponse.send() can only be called once");

        // Send can only be called once.  Get the callback, then delete it
        let callback=this._callback;
        delete this._callback;

        // Call the callback with a copy of our data structure
        if ( data !== null ) this.payload.data = data;
        callback({ ... this.payload});
        return this;
    }

    /**
     * Send a status code with the name as the body
     *
     * @param {number} code - http status code
     * @returns {this}
     */
    sendStatus(code) {
        this.status(code);
        this.set("Content-Type", "text/plain");
        switch (code) {
        case 200:
            return this.send("200 OK");
        case 204:
            return this.send("204 No Content");
        case 400:
            return this.send("400 Bad Request");
        case 401:
            return this.send("401 Unauthorized");
        case 403:
            return this.send("403 Forbidden");
        case 404:
            return this.send("404 Not Found");
        case 409:
            return this.send("409 Conflict");
        case 500:
            return this.send("500 Internal Server Error");
        case 501:
            return this.send("501 Not Implemented");
        case 503:
            return this.send("503 Service Unavailable");
        default:
            return this.send(code+"");
        }
    }

    /**
     * Add/set header
     *
     * NOTE : this is case-sensitive
     *
     * @param {string} name the name of the header
     * @param {string} value the value of the header
     * @returns {this} this for easy stacking
     */
    set(name, value){

        this.payload.headers[name]=value;
        return this;
    }

    /**
     * Set status
     *
     * @param {number} status the HTTP status code to use
     * @returns {this} this for easy stacking
     */
    status(status)  {

        // TODO - validate status codes here?
        this.payload.status=status;
        return this;
    }
}

module.exports = exports = ROSResponse;


