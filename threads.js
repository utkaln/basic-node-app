const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 6;
const startTime = Date.now();
// The following call would take about 1000 ms
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`call 1 => ${Date.now() - startTime}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`call 2 => ${Date.now() - startTime}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`call 3 => ${Date.now() - startTime}`);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`call 4 => ${Date.now() - startTime}`);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`call 5 => ${Date.now() - startTime}`);
});
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`call 6 => ${Date.now() - startTime}`);
});
