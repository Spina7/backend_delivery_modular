/**
 * Categories Routes Module.
 * 
 * This module defines the routes related to category operations. It includes functionalities 
 * for creating new categories and retrieving all available categories. All routes in this module 
 * are protected with JSON Web Tokens (JWT) to ensure authenticated and authorized access.
 * 
 */

const categoriesController = require("../controllers/categoriesController");
const passport = require("passport");

/**
 * Initializes the category-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {
  // Route to create a new category
  app.post("/api/categories/create", passport.authenticate('jwt', { session: false}), categoriesController.create);
  
  // Route to retrieve all categories
  app.get("/api/categories/getAll", passport.authenticate('jwt', { session: false}), categoriesController.getAll);
};
