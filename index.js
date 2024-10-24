const http = require("http");
const path = require("path");
const fs = require("fs");
const { error } = require("console");

// Initial Port
let PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : `${req.url}.html`
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial Content Type
  let contentType = "text/html";

  // Read File
  fs.readFile(filePath, (error, content) => {
    console.log(filePath);
    if (error) {
      fs.readFile("./404.html", (error, content) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
