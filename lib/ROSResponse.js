

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
     * @param {string} [content_type='text/json'] the content type to use
     */
    constructor(status=200, content_type="text/json") {

        this.payload={
            status : status,
            headers : {
                "Content-Type": content_type
            }
        };

        this._callback=()=>{};        // No-op, will be replaced
    }

    /**
     * Send
     *
     * Send the response.  You can only call this once.
     *
     * @throws {Error} error if you call this more than once
     * @returns {this}
     */
    send() {

        if (!this._callback) {

            throw new Error("ROSResponse.send() can only be called once");
        }

        if(!this._callback) throw new Error("ROSResponse.send() can only be called once");

        // Send can only be called once.  Get the callback, then delete it
        let callback=this._callback;
        delete this._callback;

        // Call the callback with a copy of our data structure
        callback({ ... this.payload});
        return this;
    }

    /**
     * Response callback handler
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

    /**
     * Add/set header
     *
     * Like similar Express response
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

}

module.exports = exports = ROSResponse;


