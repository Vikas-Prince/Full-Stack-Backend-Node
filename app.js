import express from "express";
import dotenv from "dotenv";
import { dbConnect, getData } from "./src/controller/dbController";
dotenv.config();
let app = express();
let port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok!");
});

app.get("/location", async (req, res) => {
  let query = {};
  let collection = "locations";
  //   let authKey = req.headers["x-auth-token"];
  //   if (authKey == key) {
  let output = await getData(collection, query);
  res.status(200).send(output);
});

app.listen(port, (err) => {
  dbConnect();
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});
