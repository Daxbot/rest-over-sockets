
const ROSRequest = require("./ROSRequest.js");

class Controller {
    #connection;
    constructor(connection) {
        this.#connection = connection;
    }

    get connection() {
        return this.#connection;
    }

    request(request, opts={}) {
        throw new Error("Not Implemented");
    }
}

class SockhopController extends Controller {
    request(msg, { timeout=5000 }={}) {
        return this.connection.request(msg, { timeout }).then(stream => {
            return stream.next(); // TODO : expand to include streamed data
        }).then(resp => {
            return resp.data; // de-payload the sockhop response to just the ROSResponse
        });
    }
}

class SocketIOController extends Controller {
    request(msg, { timeout=5000 }={}) {
        return this.connection.timeout(timeout).emitWithAck("ROSRequest", msg);
    }
}

/**
 * ROSClient for sockhop
 *
 * This is a nice wrapper for sockhop clients(sessions) which
 * will allow them to make requests to servers(clients) that
 * are hosting ROSApps more easily.
 */
class ROSClient {
    #controller;
    /**
     * Constructor
     *
     * @param {Controller} controller
     */
    constructor(controller) {
        this.#controller = controller;
    }

    /**
     * Create a new Sockhop-based ROSClient
     *
     * @param {Sockhop.client|Sockhop.session} sockhop
     */
    static sockhop(sockhop) {
        return new this(new SockhopController(sockhop));
    }

    /**
     * Create a new socket.io-based ROSClient
     *
     * @param {socketio.socket} io
     */
    static socketio(io) {
        return new this(new SocketIOController(io));
    }

    /**
     * Make a request
     *
     * @param {object} obj
     * @param {string} obj.method
     * @param {string} obj.path
     * @param {?object} obj.body
     * @param {?object} obj.headers - Note, unlike express, these are case-sensitive.
     * @param {object} [opts={}] Options to pass to the underlying controller
     * @returns {Promise<ROSResponseObject>}
     */
    $({ method, path, body, headers }, opts={}) {
        return this.#controller.request(new ROSRequest({
            method,
            path,
            body,
            headers
        }), opts)
    }

    /**
     * Make a GET request
     *
     * @param {string} path
     * @param {object} [headers={}]
     * @returns {Promise<ROSResponseObject>}
     */
    get(path, headers={}) {
        return this.$({
            method : "GET",
            path : path,
            headers : headers
        });
    }

    /**
     * Make a DELETE request
     *
     * @param {string} path
     * @param {object} [headers={}]
     * @returns {Promise<ROSResponseObject>}
     */
    delete(path, headers={}) {
        return this.$({
            method : "DELETE",
            path : path,
            headers : headers
        });
    }

    /**
     * Make a POST request
     *
     * @param {string} path
     * @param {object} [body={}]
     * @param {object} [headers={}]
     * @returns {Promise<ROSResponseObject>}
     */
    post(path, body={}, headers={}) {
        return this.$({
            method : "POST",
            path : path,
            body : body,
            headers : headers
        });
    }

    /**
     * Make a PUT request
     *
     * @param {string} path
     * @param {object} [body={}]
     * @param {object} [headers={}]
     * @returns {Promise<ROSResponseObject>}
     */
    put(path, body={}, headers={}) {
        return this.$({
            method : "PUT",
            path : path,
            body : body,
            headers : headers
        });
    }

    /**
     * Make a PATCH request
     *
     * @param {string} path
     * @param {object} [body={}]
     * @param {object} [headers={}]
     * @returns {Promise<ROSResponseObject>}
     */
    patch(path, body={}, headers={}) {
        return this.$({
            method : "PATCH",
            path : path,
            body : body,
            headers : headers
        });
    }
}

module.exports = exports = ROSClient;
