import express from "express";
import dotenv from "dotenv";
import { dbConnect, getData } from "./src/controller/dbController";
dotenv.config();
let app = express();
let port = process.env.PORT || 8080;

app.use(express.json());

// health Check Route
app.get("/", (req, res) => {
  res.send("ok!");
});

//get location
app.get("/location", async (req, res) => {
  let query = {};
  let collection = "locations";
  let output = await getData(collection, query);
  res.status(200).send(output);
});

//get restaurants
app.get("/restaurants", async (req, res) => {
  let query = {};
  let stateId = Number(req.query.stateId);
  if (stateId) {
    query = {
      state_id: stateId,
    };
  }

  let collection = "restaurants";
  let output = await getData(collection, query);
  res.status(200).send(output);
});

app.listen(port, (err) => {
  dbConnect();
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});
