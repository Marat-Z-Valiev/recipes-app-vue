const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const mongoClient = new MongoClient(process.env.VITE_MONGODB_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
  try {
    const database = (await clientPromise).db(
      process.env.VITE_MONGODB_DATABASE
    );
    const collection = database.collection(process.env.VITE_MONGODB_COLLECTION);

    if (event.httpMethod === "GET") {
      // Check if the request is for getting a recipe by ID
      if (event.queryStringParameters && event.queryStringParameters.id) {
        const recipeId = event.queryStringParameters.id;
        const objectId = new ObjectId(recipeId);
        const recipe = await collection.findOne({ _id: objectId });

        if (recipe) {
          return {
            statusCode: 200,
            headers: {
              /* Required for CORS support to work */
              "Access-Control-Allow-Origin": "*",
              /* Required for cookies, authorization headers with HTTPS */
              "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(recipe),
          };
        } else {
          return { statusCode: 404, body: "Recipe not found" };
        }
      }
    }

    if (event.httpMethod === "DELETE") {
      // Check if the request is for deleting a recipe by ID
      if (event.queryStringParameters && event.queryStringParameters.id) {
        const recipeId = event.queryStringParameters.id;
        const objectId = new ObjectId(recipeId);
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 1) {
          return {
            statusCode: 200,
            headers: {
              /* Required for CORS support to work */
              "Access-Control-Allow-Origin": "*",
              /* Required for cookies, authorization headers with HTTPS */
              "Access-Control-Allow-Credentials": true,
            },
            body: "Recipe deleted successfully",
          };
        } else {
          return { statusCode: 404, body: "Recipe not found" };
        }
      }
    }

    if (event.httpMethod === "PUT") {
      // Check if the request is for editing a recipe by ID
      if (
        event.queryStringParameters &&
        event.queryStringParameters.id &&
        event.body
      ) {
        const recipeId = event.queryStringParameters.id;
        const updatedRecipe = JSON.parse(event.body);
        const objectId = new ObjectId(recipeId);
        const result = await collection.updateOne(
          { _id: objectId },
          { $set: updatedRecipe }
        );

        if (result.modifiedCount === 1) {
          return {
            statusCode: 200,
            headers: {
              /* Required for CORS support to work */
              "Access-Control-Allow-Origin": "*",
              /* Required for cookies, authorization headers with HTTPS */
              "Access-Control-Allow-Credentials": true,
            },
            body: "Recipe updated successfully",
          };
        } else {
          return { statusCode: 404, body: "Recipe not found" };
        }
      }
    }

    if (event.httpMethod === "POST") {
      // Check if the request is for creating a recipe
      if (event.body) {
        const newRecipe = JSON.parse(event.body);

        try {
          const result = await collection.insertOne(newRecipe);

          if (result.insertedCount === 1) {
            return {
              statusCode: 200,
              headers: {
                /* Required for CORS support to work */
                "Access-Control-Allow-Origin": "*",
                /* Required for cookies, authorization headers with HTTPS */
                "Access-Control-Allow-Credentials": true,
              },
              body: "Recipe created successfully",
            };
          } else {
            return { statusCode: 500, body: "Failed to create recipe" };
          }
        } catch (error) {
          return { statusCode: 500, body: error.toString() };
        }
      }
    }

    // If no specific ID or valid HTTP method is provided, return all recipes
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
