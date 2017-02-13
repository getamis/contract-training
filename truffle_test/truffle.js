var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  }),
  networks: {
    development: {
      host: "localhost",
      port: 8547,
      network_id: "*" // Match any network id
    }
  }
};
