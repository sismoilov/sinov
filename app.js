console.log("web Serverni boshlash");

const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

let users = [];
fs.readFile("database/user.json", "utf-8", (err, data) => {
    if (err) {
        console.log("ERROR: ", err);
    } else {
        users = JSON.parse(data);
    }
})


// MongoDB chaqirish
const db = require("./server").db();
const mongodb = require("mongodb");


// 1 kirish code 

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Session  code 
// 3 views code 
app.set("views", "views");
app.set("view engine", "ejs");

// 4 routing code
app.post("/create-item", (req, res) => {

    console.log("user entered /create-item");
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
      console.log( data.ops);
      res.json(data.ops[0]) ; 

    });
   // res.json({test:"succes"});
});

//  ochirish tugmasi uchun  yozilgan code
app.post("/delete-item", (req, res) => {
    console.log("user entered /delete-item");
    const id = req.body.id;
    db.collection("plans").deleteOne({ _id: new mongodb.ObjectID(id) }, (err, data) => {
        if (err) {
            console.log("ERROR: ", err);
            res.end("something went wrong");
        } else {
            res.end("succes");
        }
    });
});

// ozgartirish tugmasi uchun  yozilgan code
app.post("/edit-item", (req, res) => {
    console.log("user entered /edit-item");
    const id = req.body.id;
    const reja = req.body.reja;
    db.collection("plans").updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { reja: reja } }, (err, data) => {
        if (err) {
            console.log("ERROR: ", err);
            res.end("something went wrong");
        } else {
            res.end("succes");
        }
    });
});

// hammasini ochirish tugmasi uchun  yozilgan code
app.post("/delete-all", (req, res) => {
    if(req.body.delete_all) {
        db.collection("plans").deleteMany(function () {
            res.json({state:"hamma rejalar ochirildi"});
        });
    }
});

// app.get("/author", (req, res) => {
//     res.render("author", { user:users });
// });



app.get("/", function (req, res) {
    console.log("user entered/");
    db.collection("plans").find().toArray((err, data) => {
        if (err) {
            console.log("ERROR: ", err);
            res.end("something went wrong");
        } else {
            res.render("reja",{items: data });
        }
    });
});

module.exports = app;