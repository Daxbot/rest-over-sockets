

// Load the App as the default export
const App = require("./lib/ROSApp.js");

// Attach contructors for `const { ROSClient } = require('rest-over-sockets');` style requiring
App.ROSApp = require("./lib/ROSApp.js");
App.ROSClient = require("./lib/ROSClient.js");
App.ROSRequest = require("./lib/ROSRequest.js");
App.ROSResponse = require("./lib/ROSResponse.js");

module.exports=exports=App;
