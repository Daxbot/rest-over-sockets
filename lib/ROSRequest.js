
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
 * @property {?object} headers any header information, like 'Content-Type'
 * @property {object} [params={}] any parameters captured from the path (i.e. `{ id: "15" }` for '/api/user/15')
 * @property {object} [query={}] an query parameters parsed from the path's query section (i.e. `{ limit:"15" }` for '/api/users?limit=15')
 * @property {?object} body an optional body (for POST/PUT/PATCH)
 */



/**
 * ROSRequest
 */
class ROSRequest {
    /**
     * Constructor
     *
     * @param {object} obj
     * @param {?string} [obj.path=null]
     * @param {?string} [obj.method=null]
     * @param {?object} [obj.headers=undefined]
     * @param {?object} [obj.body=undefined]
     */
    constructor({
        path=null,
        method=null,
        headers=undefined,
        body=undefined
    }={}) {
        this.path = path;
        this.method = method;
        this.headers = headers;
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
     * @private
     * @returns {object}
     */
    toJSON() {
        return {
            method : this.method,
            path : this.path,
            headers : this.headers,
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
    attach_params(params) {
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
    attach_query(query) {
        this.query = query;
        return this;
    }
}

module.exports = exports = ROSRequest;
