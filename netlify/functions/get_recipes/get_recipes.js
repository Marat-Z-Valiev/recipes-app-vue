const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

console.log("MongoDB connection URI:", process.env.VITE_MONGODB_URI);

const mongoClient = new MongoClient(
  "mongodb+srv://Cluster45491:fUJeZVB7RGFU@cluster45491.q3xtkkf.mongodb.net/?retryWrites=true&w=majority"
);

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
      body: JSON.stringify(results),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
