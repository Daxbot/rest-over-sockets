const RouteParser = require("route-parser");

const ROSResponse = require("./ROSResponse.js");
const ROSRequest = require("./ROSRequest.js");

/**
 *
 * requestHandler(req, response)
 *
 * @callback requestHandler
 * @param {ROSRequest} req the request object
 * @param {ROSResponse} response the response you are sending to the client
 */

/**
 *
 * responseHandler(response)
 *
 * @callback responseHandler
 * @param {ROSResponse} response the response that should be sent back to the client
 */

/**
 * ROSApp
 *
 * Approximately an express app
 */
class ROSApp {

    /**
     * Constructor
     */
    constructor() {
        this.handlers=[];
    }

    // ----------------------
    //  Custom Methods
    // ----------------------

    /**
     * Receive
     *
     * Call this when new data has been received for processing
     *
     * @param {object} data the received data from the client (do not pass a string, de/encoding is your responsibility)
     * @param {responseHandler} callback
     * @return {Proimse<ROSResponse>} Resolves to the ROSResponse that was sent (probably -- unless someone forgot to .send in their handler)
     */
    receive(o={}, callback){

        // Require a callback
        if(typeof(callback)!="function") throw new Error("Restos.receive() requires a callback function for response handling");

        // Set up a ROSResponse object with the callback it will need to return data
        let response=new ROSResponse();
        response.callback=callback;

        // Parse the request object
        let request;
        try {
            request = ROSRequest.parse(o);
        } catch (err) {
            return response
                .error("Bad Request", { status: 400, detail: err.message })
                .send();
        }

        // Find a matching route
        for(let handler of this.handlers) {

            // If the method doesn't match, just continue along
            if ( request.method != handler.method ) continue;

            // Try to parse against path against the route
            let params = handler.route.match(request.path);

            // If the route didn't match, just continue along
            if ( !params ) continue;

            // Wrap the function call in a promise to normalize sync/async functions
            return new Promise(res => {
                res(handler.handler(request.attach_params(params), response));
            }).then(() => {
                return response;  // The handler is responsible for calling ROSResponse.send(), so we should be done
            }).catch((err) => {
                return response
                    .error("Internal Error", { status: 500, detail: err.message})
                    .send();
            });
        }

        // We didn't find anything, return a 404
        return new Promise(res => {
            res(response
                .error("Not Found", { status: 404, detail: "The page or resource you are looking for does not exist"})
                .send()
            );
        });
    }


    // ----------------------
    //  Express-esk Methods
    // ----------------------

    /**
     * PUT
     *
     * Add a route handler for PUT on a given path
     *
     * @param {string} path the URL path.  Supports parameter capture, like "/dogs/:id/name"
     * @param {requestHandler} handler the request handler
     * @return {this} this a reference to ourselves, for ease in stacking
     */
    put(path, handler) {
        return this.add_handler("put", path, handler);
    }

    /**
     * DELETE
     *
     * Add a route handler for DELETE on a given path
     *
     * @param {string} path the URL path.  Supports parameter capture, like "/dogs/:id/name"
     * @param {requestHandler} handler the request handler
     * @return {this} this a reference to ourselves, for ease in stacking
     */
    delete(path, handler) {
        return this.add_handler("delete", path, handler);
    }

    /**
     * POST
     *
     * Add a route handler for POST on a given path
     *
     * @param {string} path the URL path.  Supports parameter capture, like "/dogs/:id/name"
     * @param {requestHandler} handler the request handler
     * @return {this} this a reference to ourselves, for ease in stacking
     */
    post(path, handler) {
        return this.add_handler("post", path, handler);
    }

    /**
     * GET
     *
     * Add a route handler for GET on a given path
     *
     * @param {string} path the URL path.  Supports parameter capture, like "/dogs/:id/name"
     * @param {requestHandler} handler the request handler
     * @return {this} this a reference to ourselves, for ease in stacking
     */
    get(path, handler) {
        return this.add_handler("get", path, handler);
    }

    /**
     * PATCH
     *
     * Add a route handler for PATCH on a given path
     *
     * @param {string} path the URL path.  Supports parameter capture, like "/dogs/:id/name"
     * @param {requestHandler} handler the request handler
     * @return {this} this a reference to ourselves, for ease in stacking
     */
    patch(path, handler){
        return this.add_handler("patch", path, handler);
    }

    /**
     * Add a handler
     *
     * @private
     * @param {string} method one of "GET", "POST", etc
     * @param {string} path the URL path.  Supports parameter capture, like "/dogs/:id/name"
     * @param {requestHandler} handler the request handler
     * @return {this} this a reference to ourselves, for ease in stacking
      */
    add_handler(method, path, handler) {

        this.handlers.push({
            method: method,
            route: new RouteParser(path),
            handler: handler
        });

        return this;
    }
}

module.exports = exports = ROSApp;

