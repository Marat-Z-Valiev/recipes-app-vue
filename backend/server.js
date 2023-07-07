// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const dotenv = require("dotenv");

// dotenv.config();

// mongoose
//   .connect(process.env.VITE_MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB Atlas");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB Atlas", error);
//   });

// const recipeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   ingredients: [{ type: String }],
//   instructions: { type: String },
// });

// const Recipe = mongoose.model("Recipe", recipeSchema);

// app.post("/recipes", (req, res) => {
//   const { title, description, ingredients, instructions } = req.body;

//   const recipe = new Recipe({
//     title,
//     description,
//     ingredients,
//     instructions,
//   });

//   recipe
//     .save()
//     .then((newRecipe) => {
//       res.json(newRecipe);
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "An error occurred while creating the recipe." });
//     });
// });

// app.get("/recipes", (req, res) => {
//   Recipe.find()
//     .then((recipes) => {
//       res.json(recipes);
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "An error occurred while retrieving the recipes." });
//     });
// });

// app.get("/recipes/:id", (req, res) => {
//   const recipeId = req.params.id;

//   Recipe.findById(recipeId)
//     .then((recipe) => {
//       if (!recipe) {
//         return res.status(404).json({ error: "Recipe not found." });
//       }
//       res.json(recipe);
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "An error occurred while retrieving the recipe." });
//     });
// });

// app.put("/recipes/:id", (req, res) => {
//   const recipeId = req.params.id;
//   const { title, description, ingredients, instructions } = req.body;

//   Recipe.findByIdAndUpdate(
//     recipeId,
//     {
//       title,
//       description,
//       ingredients,
//       instructions,
//     },
//     { new: true }
//   )
//     .then((updatedRecipe) => {
//       if (!updatedRecipe) {
//         return res.status(404).json({ error: "Recipe not found." });
//       }
//       res.json(updatedRecipe);
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "An error occurred while updating the recipe." });
//     });
// });

// app.delete("/recipes/:id", (req, res) => {
//   const recipeId = req.params._id;
//   Recipe.findByIdAndDelete(recipeId)
//     .then((deletedRecipe) => {
//       if (!deletedRecipe) {
//         return res.status(404).json({ error: "Recipe not found." });
//       }
//       res.json({ message: "Recipe deleted successfully." });
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "An error occurred while deleting the recipe." });
//     });
// });

// const port = 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
