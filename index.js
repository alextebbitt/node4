let http = require("http"); // import the built-in http module, so that we can create http server
//which will respond to our requests
const fs = require("fs"); // to read file info
const url = require("url"); // provides utilities for URL resolution and parsing returns an object

http
  .createServer((req, res) => {
    //method turns your computer into an HTTP server.
    const q = url.parse(req.url, true); // splitting a URL string into its components,
    // or on combining URL components into a URL string. returns an object

    const filename = "./" + q.pathname; // making sure url is correct with . + /

    fs.readFile(filename, (err, data) => {
      // Returns the contents of the file named filename
      try {
        res.writeHead(200, { "Content-Type": "text/html" }); //returns correct code and tells
        //browsers what type of document it is

        res.write(data); // Can be called multiple times to provide successive parts of the body.

        return res.end(); // used to quickly end the response without sending any data
      } catch (error) {
        res.writeHead(404, { "Content-Type": "text/html" }); //

        console.error(error);

        return res.end("404 Not Found"); // return message if there is an error
      }
    });
  })
  .listen(4001);
