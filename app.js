import express from "express";
import dotenv from "dotenv";
import {
  dbConnect,
  getData,
  getDataSort,
  getDataSortLimit,
} from "./src/controller/dbController";

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

//get mealType
app.get("/mealType", async function (req, res) {
  const query = {};
  const collection = "mealType";
  let output = await getData(collection, query);
  res.status(200).send(output);
});

//filters
app.get("/filters/:mealId", async (req, res) => {
  let query = {};
  let collection = "restaurants";
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  let hcost = Number(req.query.hcost);
  let lcost = Number(req.query.lcost);
  let sort = { cost: 1 };
  let skip = 0;
  let limit = 10000000000000000;

  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }

  if (req.query.skip && req.query.limit) {
    skip = Number(req.query.skip);
    limit = Number(req.query.limit);
  }

  if (cuisineId) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
    };
  } else if (hcost && lcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  } else {
    query = {
      "mealTypes.mealtype_id": mealId,
    };
  }

  let output = await getDataSortLimit(collection, query, sort, skip, limit);
  res.status(200).send(output);
});


app.listen(port, (err) => {
  dbConnect();
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});
