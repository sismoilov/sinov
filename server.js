console.log("serverni ishga tushirish");

const express = require("express");
const res = require("express/lib/response");
const app = express();
const http = require("http");
const fs = require("fs");

let user;


fs.readFile("database/user.json", "utf-8", (err, data) => {
    if (err) {
      console.log( "ERROR:", err);
    } else {
      user = JSON.parse(data);
    }
  })


 app.use(express.static("public"));
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 app.set("views", "views");
 app.set("view engine", "ejs");

 app.post("/create-item", (req, res) => {
   console.log(req.body);
   res.json({ test: "success"});
 });

 app.get("/author", (req, res) => {  
   res.render("author", {user:user});
  });


 app.get("/", function(req, res) {
   res.render("harid");
 });

 const server = http.createServer(app);
 let port = 3000;
 server.listen(port, function() {
   console.log(`Server is running on port:  ${port}`);
 });   