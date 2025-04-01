import express from "express";
import dotenv from "dotenv";
import {
  dbConnect,
  getData,
  getDataSort,
  getDataSortLimit,
  getMenuData,
  updateData,
  deleteData,
} from "./src/controller/dbController.js";
import cors from "cors";

dotenv.config();
let app = express();
let port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// health Check Route
app.get("/health", (req, res) => {
  res.send("ok!");
});

//get location
app.get("/location", async (req, res) => {
  let query = {};
  let collection = "location";
  let output = await getData(collection, query);
  res.status(200).send(output);
});

//get restaurants
app.get("/restaurant", async (req, res) => {
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

//details of selected restaurant
app.get("/details/:id", async (req, res) => {
  let query = {};
  let collection = "restaurants";
  let restId = Number(req.params.id);
  if (restId > 0) {
    query = {
      restaurant_id: restId,
    };
    let output = await getData(collection, query);
    res.status(200).send(output);
  }
});

//menu details of particular restaurant
app.get("/menu/:id", async (req, res) => {
  let query = {};
  let collection = "menu";
  let restId = Number(req.params.id);
  if (restId > 0) {
    query = {
      restaurant_id: restId,
    };
    let output = await getMenuData(collection, query);
    res.status(200).send(output);
  } else {
    res.status(404).send("<p>Menu is Not Available at this time</p>");
  }
});

//menu details
app.post("/menuDetails", async (req, res) => {
  if (Array.isArray(req.body.id)) {
    let query = { menu_id: { $in: req.body.id } };
    let collection = "menu";
    let output = await getData(collection, query);
    res.status(200).send(output);
  } else {
    res.send(`Please pass data in format of {"id:[1,2,3]}`);
  }
});

//get Orders
app.get("/orders", async (req, res) => {
  let query = {};
  let collection = "orders";
  if (req.query.email) {
    query = { email: req.query.email };
  }
  let output = await getData(collection, query);
  res.status(200).send(output);
});

//place Orders
app.post("/placeOrder", async (req, res) => {
  let data = req.body;
  console.log(data);
  let collection = "orders";
  let output = await postData(collection, data);
  res.status(200).send(`Order Placed ${output}`);
});

// update order
app.put("/updateOrder", async (req, res) => {
  let collection = "orders";
  let condition = { _id: new ObjectId(req.body._id) };
  let data = {
    $set: {
      status: req.body.status,
    },
  };
  let output = await updateData(collection, condition, data);
  res.status(200).send(output);
});

// delete order
app.delete("/deleteOrder", async (req, res) => {
  let collection = "orders";
  let condition = { _id: new ObjectId(req.body._id) };
  let row = await getData(collection, condition);
  if (row.length > 0) {
    await deleteData(collection, condition);
    res.status(200).send("Data Deleted");
  } else {
    res.status(200).send("No Record Found");
  }
});

app.listen(port, (err) => {
  dbConnect();
  if (err) throw err;
  console.log(`Server listening on ${port}`);
});


export default app;