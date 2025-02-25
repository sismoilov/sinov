console.log("serverni ishga tushirish");
const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    user = JSON.parse(data);
  }
});

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
  res.json({test: "successfully"});
});

app.get("/", function (req, res) {
  res.render("reja");
});
app.get("/author", (req, res) =>{
  res.render("author", {user: user});
} );

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}, http://localhost:${PORT}/author`);
} );
