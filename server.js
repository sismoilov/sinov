const http = require("http");
const mongodb = require("mongodb");
let db;
const connectionString = "mongodb+srv://williamismoilov:RO2emViObmvHM2Ok@cluster0.qvw6y.mongodb.net/Reja?retryWrites=true&w=majority&appName=Cluster0&authSource=admin&ssl=true";

mongodb.connect(connectionString, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }, 
    (err, client) => {
  if (err) {
    console.log("mongodb da xato bor:",err);
  } else {
    console.log("mongodbga ulanish hosil qilindi");
    module.exports = client;
    const app = require("./app");
    const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}, http://localhost:${PORT}/author`);
} );

  }
});
