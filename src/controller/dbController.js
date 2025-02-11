import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let mongoUrl = process.env.MONGODB_URL;
// console.log(mongoUrl);
let db;

async function dbConnect() {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  db = client.db("Food_Store");
  //   console.log(db);
  console.log(`Connected to database`);
}

export { dbConnect };
