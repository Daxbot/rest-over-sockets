
/**
 * Global definition of response object
 *
 * This is what will be returned with to the requester.
 *
 * @typedef ROSResponseObject
 * @type {object}
 * @property {number} statusCode
 * @property {object} headers - any header information, like 'content-type' (NOTE the key values will be lower-cased to match express/nodejs paradigm)
 * @property {?object} data
 */


/**
 * ROSResponse
 *
 * Approximately the same as an express Response object
 */
class ROSResponse {
    #sent;
    #callback;
    #headers;

    /**
     * Constructor
     *
     * @param {object} obj
     * @param {number} [obj.statusCode=200] the HTTP status code
     * @param {object} obj.headers - any header information (NOTE will be lower cased)
     * @param {?object} [obj.data=undefined]
     * @param {responseHandler} [obj.callback=()=>{}]
     * @param {boolean} [obj.sent=false]
     */
    constructor({
        statusCode=200,
        headers={},
        data=undefined,
        callback=()=>{},
        sent=false
    }={}) {

        this.statusCode = statusCode;
        this.#headers = {};
        for ( const key in headers ) this.setHeader(key, headers[key]);
        this.data = data;

        this.#callback=callback;
        this.#sent = sent;
    }

    /**
     * Create a new ROSResponse
     *
     * @static
     * @param {responseHandler} cb
     * @return {ROSResponse}
     */
    static new(cb) {
        return new this({ callback:cb });
    }

    /**
     * Custom JSON stringify method
     *
     * @returns {ROSResponseObject}
     */
    toJSON() {
        return {
            statusCode : this.statusCode,
            headers : this.#headers,
            data : this.data
        };
    }

    // -----------------------------------------------
    //     Custom Methods
    // -----------------------------------------------

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
    error(title, { statusCode=500, detail="" }={}) {

        this.status(statusCode);
        this.setHeader("content-type", "application/json");

        this.data = {
            title,
            detail
        };

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
     * Get a header from a key (alias for .getHeader() c.f. express)
     *
     * @param {string} key the name of the header
     * @returns {string}
     */
    get(key){
        return this.getHeader(key);
    }

    /**
     * Add/set header (alias for .setHeader() c.f. express)
     *
     * @param {string} key the name of the header
     * @param {string} value the value of the header
     * @returns {this} this for easy stacking
     */
    set(key, value){
        return this.setHeader(key, value);
    }

    /**
     * Set status
     *
     * @param {number} status the HTTP status code to use
     * @returns {this} this for easy stacking
     */
    status(status)  {
        this.statusCode = status;
        return this;
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
        this.setHeader("content-type","application/json");
        return this.send(data);
    }

    /**
     * Send
     *
     * Send the response.  You can only call this once.
     *
     * @param {*} [data=undefined] Optional data to attach
     * @throws {Error} error if you call this more than once
     * @returns {this}
     */
    send(data=undefined) {

        if ( this.#sent ) throw new Error("ROSResponse.send() can only be called once");
        this.#sent = true;

        // Call the callback with a copy of our data structure
        if ( data !== undefined ) this.data = data;

        this.#callback(this.toJSON());

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
        this.setHeader("content-type", "text/plain");
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


    // -----------------------------------------------
    //     nodejs-esk Methods
    // -----------------------------------------------


    /**
     * Set a header to value
     *
     * @param {string} key - NOTE: this will be forced to lower case
     * @param {string} value - the value of the header
     * @return {this}
     */
    setHeader(key, value) {
        this.#headers[key.toLowerCase()] = value;
        return this;
    }

    /**
     * Get a header from a key
     *
     * @param {string} key - NOTE: this will be forced to lower case
     * @return {string}
     */
    getHeader(key) {
        return this.#headers[key.toLowerCase()];
    }

    /**
     * Check if a header exists
     *
     * @param {string} key - NOTE: this will be forced to lower case
     * @return {boolean}
     */
    hasHeader(key) {
        return this.#headers[key.toLowerCase()] === undefined;
    }

}

module.exports = exports = ROSResponse;


