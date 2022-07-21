const RouteParser = require("route-parser");

const ROSResponse = require("./ROSResponse.js");

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
 * ROSServer
 *
 * Approximately an express app
 */
class ROSServer {

    /**
     * Constructor
     */
    constructor() {
        this.handlers=[];
    }

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
     * Receive
     *
     * Call this when new data has been received for processing
     *
     * @param {object} data the received data from the client (do not pass a string, de/encoding is your responsibility)
     * @param {responseHandler} callback
     * @return {ROSResponse} ROSResponse that was (or will be) sent - caution, this happens asynchronously so the ROSResponse may still be changing when you get it back
     */
    receive(o={}, callback){

        // Require a callback
        if(typeof(callback)!="function") throw new Error("Restos.receive() requires a callback function for response handling");

        // Set up a ROSResponse object with the callback it will need to return data
        let response=new ROSResponse();
        response.callback=callback;

        // Require a method and path
        if(typeof(o.method)!="string") {

            return response.error("Bad Request", { status: 400, detail: "Restos.receive() requires the first parameter to contain a value called 'method'"}).send();
        }

        // Require a method and path
        if(typeof(o.path)!="string") {

            return response.error("Bad Request", { status: 400, detail: "Restos.receive() requires the first parameter to contain a value called 'path'"}).send();
        }


        // Find a matching route
        for(let handler of this.handlers) {

            if(o.method.toLowerCase()==handler.method) {

                let params;
                if(params=handler.route.match(o.path)) { // eslint-disable-line no-cond-assign

                    try {

                        handler.handler(Object.assign({ params: params}, o), response);    // The handler is responsible for calling ROSResponse.send()
                        return response;

                    } catch(e) {

                        return response.error("Internal Error", { status: 500, detail: e.message}).send();
                    }
                }
            }
        }

        return response.error("Not Found", { status: 404, detail: "The page or resource you are looking for does not exist"}).send();
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

module.exports = exports = ROSServer;

