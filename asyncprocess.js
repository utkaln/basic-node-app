const https = require("https");
const startTime = Date.now();

function sendReq() {
  https
    .request("https://www.odishasociety.org", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - startTime);
      });
    })
    .end();
}

sendReq();
sendReq();
sendReq();
sendReq();
sendReq();
