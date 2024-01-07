// cluster allows to create more instances of node service
// Remember to reduce thread count when using cluster
const cluster = require("cluster");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 1;
const startTime = Date.now();

// runs in worker mode
const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 3000; //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  // make a call to simulate workload that takes about a second
  sampleWorkload();
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.get("/hello", (req, res) => {
  // make a call to simulate workload that takes about a second
  sampleWorkload();
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});

function sampleWorkload() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log(`pbkdf2 => ${Date.now() - startTime}`);
  });
}
