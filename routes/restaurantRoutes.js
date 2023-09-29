/**
 * Restaurant Routes Module.
 * 
 * This module defines the routes related to restaurant operations such as
 * creating a new restaurant and fetching all restaurants. All routes in this 
 * module require authentication using JSON Web Tokens (JWT) to ensure secure 
 * access to restaurant data.
 * 
 */

const restaurantController = require("../controllers/restaurantController");
const passport = require("passport");

/**
 * Initializes the restaurant-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {
  // Route to create a new restaurant
  app.post("/api/restaurants/create", passport.authenticate('jwt', { session: false}), restaurantController.create);
  
  // Route to fetch all restaurants
  app.get("/api/restaurants/getAll", passport.authenticate('jwt', { session: false}), restaurantController.getAll);
  // Route to fetch all restaurants
  app.get("/api/restaurants/getCount", passport.authenticate('jwt', { session: false}), restaurantController.getCount);
  app.get("/api/restaurants", restaurantController.getAllRestaurants);
};
