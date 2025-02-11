import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let mongoUrl = process.env.MONGODB_URL;
// console.log(mongoUrl);
let db;

async function dbConnect() {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  db = client.db("food_store");
  //   console.log(db);
  console.log(`Connected to database`);
}

async function getData(colName, query) {
  let output;
  try {
    output = await db.collection(colName).find(query).toArray();
  } catch (err) {
    output = { Error: "Error in getting data" };
  }

  return output;
}

async function getDataSort(colName, query, sort) {
  let output;
  try {
    output = await db.collection(colName).find(query).sort(sort).toArray();
  } catch {
    output = { Error: "Error in getting data" };
  }

  return output;
}

async function getDataSortLimit(colName, query, sort, skip, limit) {
  let output;
  try {
    output = await db
      .collection(colName)
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  } catch {
    output = { Error: "Error in getting data" };
  }

  return output;
}

async function getMenuData(colName, query) {
  let output;
  try {
    output = await db.collection(colName).find(query).toArray();
  } catch (err) {
    output = { Error: "Error in getting data" };
  }

  return output;
}

async function postMenuDetails(colName, query) {
  let output;
  try {
    output = await db.collection(colName).insertOne(query);
  } catch {
    output = { Error: "Error in posting data" };
  }

  return output;
}

async function updateData(colName, condition, data) {
  let output;
  try {
    output = await db.collection(colName).updateOne(condition, data);
  } catch (err) {
    output = { response: "Error In Updating Data" };
  }
  return output;
}

export {
  dbConnect,
  getData,
  getDataSort,
  getDataSortLimit,
  getMenuData,
  updateData,
};
