
/**
 * Global definition of request object
 *
 * The ROSApp will respect requests that conform to this format,
 * though, if you are using sockhop, you are encouraged to actually
 * send the ROSRequest instance (no just the serialized version).
 *
 * @typedef ROSRequestObject
 * @type {object}
 * @property {string} path the requested path
 * @property {string} method GET, PUT, POST, etc
 * @property {?object} headers any header information, like 'content-type' (NOTE: these will be lower-cased to match express/nodejs paradigm)
 * @property {object} [params={}] any parameters captured from the path (i.e. `{ id: "15" }` for '/api/user/15')
 * @property {object} [query={}] an query parameters parsed from the path's query section (i.e. `{ limit:"15" }` for '/api/users?limit=15')
 * @property {?object} body an optional body (for POST/PUT/PATCH)
 */


/**
 * ROSRequest
 */
class ROSRequest {
    #headers;

    /**
     * Constructor
     *
     * @param {object} obj
     * @param {?string} [obj.path=null]
     * @param {?string} [obj.method=null]
     * @param {?object} [obj.headers=undefined] - if an object, the keys will be forced to lower case (a. la. express.js)
     * @param {?object} [obj.body=undefined]
     */
    constructor({
        path=null,
        method=null,
        headers={},
        body=undefined
    }={}) {
        this.path = path;
        this.method = method;
        this.#headers = {};
        for ( const key in headers ) this.setHeader(key, headers[key]);
        this.body = body;

        this.params = {};
        this.query = {};
    }

    /**
     * The request path
     *
     * @type {string}
     */
    get path() {
        return this._path;
    }
    set path(path) {
        if ( typeof(path) !== "string" ) {
            throw new Error("Request path must be type 'string', got '"+typeof(path)+"'");
        }
        this._path = path;
    }

    /**
     * Get a header from a key (alias for .getHeader() c.f. express)
     *
     * @param {string} key - NOTE: this will be forced to lower case
     * @return {string}
     */
    get(key) {
        return this.getHeader(key);
    }

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

    /**
     * The request method
     *
     * Must be one of: GET, POST, PUT, PATCH, DELETE.
     *
     * Automatically converted to lower case.
     *
     * @type {string}
     */
    get method() {
        return this._method;
    }
    set method(method) {
        if ( typeof(method) !== "string" ) {
            throw new Error("Request method must be type 'string', got '"+typeof(method)+"'");
        }

        let meth = (method.toLowerCase());
        if ( !["get","post","put","patch","delete"].includes(meth) ) {
            throw new Error("Unsupported method '"+method+"'");
        }

        this._method = meth;
    }

    /**
     * Parse an object as a ROSRequest
     *
     * @param {ROSRequestObject}
     * @returns {ROSRequest}
     */
    static parse(obj) {
        return new this(obj);
    }

    /**
     * Custom JSON stringify method
     *
     * @returns {ROSRequestObject}
     */
    toJSON() {
        return {
            method : this.method,
            path : this.path,
            headers : this.#headers,
            body : this.body
        };
    }

    /**
     * Attach parsed URL parameters
     *
     * @private
     * @param {object} params
     * @returns {this}
     */
    attachParams(params) {
        this.params = params;
        return this;
    }

    /**
     * Attach parsed URL query parameters
     *
     * @private
     * @param {object} query
     * @returns {this}
     */
    attachQuery(query) {
        this.query = query;
        return this;
    }
}

module.exports = exports = ROSRequest;
