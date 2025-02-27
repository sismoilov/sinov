console.log("serverni ishga tushirish");
const express = require("express");
const app = express();
// const http = require("http");
const fs = require("fs");

// let user;
// fs.readFile("database/user.json", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     user = JSON.parse(data);
//   }
// });
// mongo db 
const db = require("./server").db();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "views");
app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.end("Hello World!");
// });
app.post("/create-item",  (req, res) => {
  console.log(req.body);
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
    if (err) {
      console.log(err);
      res.end("smth went wrong");
    } else {
     res.end("successfully added");
    }
  } );
  // res.end("successfully");
  // res.json({test: "successfully"});
});

app.get("/", function ( req , res)  {
  db.collection("plans")
    .find()
    .toArray((err, data) => {
    if (err) {
      console.log(err);
      res.end("smth went wrong");
    } else {
      console.log(data);
      res.render("reja", {items: data});
    }
  });
  res.render("reja");
});
// app.get("/author", (req, res) =>{
//   res.render("author", {user: user});
// } );

// const server = http.createServer(app);
// let PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running successfully on http://localhost:${PORT}, http://localhost:${PORT}/author`);
// } );

module.exports = app;