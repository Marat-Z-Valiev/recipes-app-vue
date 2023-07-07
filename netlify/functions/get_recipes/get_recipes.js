const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

const mongoClient = new MongoClient(process.env.VITE_MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db(
      process.env.VITE_MONGODB_DATABASE
    );
    const collection = database.collection(process.env.VITE_MONGODB_COLLECTION);
    const results = await collection.find({}).toArray();
    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        /* Required for cookies, authorization headers with HTTPS */
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(results),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
