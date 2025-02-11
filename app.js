import express from "express";
import dotenv from "dotenv";
dotenv.config();
let app = express();
let port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to Your World!");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});
