//const rootElement = document.getElementById("app");
//const myElement = document.createElement("h1");
//myElement.className = "orange";
//myElement.innerText = "Hello World";
//const helloElement = function () {
//return React.createElement("h1", { className: "orange" }, "Hello from React");
//};

//rootElement.appendChild(myElement);
//ReactDOM.render(
//  React.createElement(helloElement, {}, null),
//  document.getElementById("app")
//);

const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 3000; //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
