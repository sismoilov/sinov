console.log("serverni ishga tushirish");
const express = require("express");
 const app = express();
 const http = require("http")

 app.use(express.static("public"));
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 app.set("views", "views");
 app.set("view engine", "ejs");

 app.get("/", function(req, res) {
    res.end("<h1>HELLO WORLD by SARDOR</h1>");
 });

   app.get("/gift", function(req, res) {
      res.end("<h1>siz sovg'alar bolimidasiz</h1>");
   });

 const server = http.createServer(app);
 let port = 3000;
 server.listen(port, function() {
   console.log(`Server is running on port:  ${port}`);
 });   