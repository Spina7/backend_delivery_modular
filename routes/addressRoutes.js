/**
 * Address Routes Module.
 * 
 * This module defines the routes related to user address operations. It includes functionalities 
 * for creating a new address and retrieving addresses associated with a specific user. All routes in this 
 * module are secured with JSON Web Tokens (JWT) to ensure only authenticated users can access them.
 * 
 */

const addressController = require("../controllers/addressController");
const passport = require("passport");

/**
 * Initializes the address-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {
  // Route to create a new address for the user
  app.post("/api/address/create", passport.authenticate('jwt', { session: false}), addressController.create);
  
  // Route to retrieve all addresses associated with a specific user
  app.get("/api/address/findByUser/:id_user", passport.authenticate('jwt', { session: false}), addressController.findByUser);
};
