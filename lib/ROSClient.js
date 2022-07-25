
const ROSRequest = require("./ROSRequest.js");

/**
 * ROSClient for sockhop
 *
 * This is a nice wrapper for sockhop clients(sessions) which
 * will allow them to make requests to servers(clients) that
 * are hosting ROSApps more easily.
 */
class ROSClient {
    /**
     * Constructor
     *
     * @param {sockhop.SockhopClient|sockhop.SockhopSession} sockhop
     */
    constructor(sockhop) {
        this.sockhop = sockhop;
    }

    /**
     * Make a request
     *
     * @param {object} obj
     * @param {string} obj.method
     * @param {string} obj.path
     * @param {?object} obj.body
     * @param {?object} obj.headers
     * @returns {Promise<ROSResponseObject>}
     */
    $({ method, path, body, headers }) {
        return this.sockhop.request(new ROSRequest({
            method,
            path,
            body,
            headers
        })).then(stream => {
            return stream.next(); // TODO : expand to include streamed data
        }).then(resp => {
            return resp.data; // de-payload the sockhop response to just the ROSResponse
        });
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
