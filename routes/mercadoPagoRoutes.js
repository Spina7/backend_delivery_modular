/**
 * Payments Routes Module.
 * 
 * This module defines the routes related to payment operations using Mercado Pago. It allows 
 * the creation of payments. All routes in this module require authentication using 
 * JSON Web Tokens (JWT) for secure transactions.
 * 
 * Note: Though categoriesController is imported, it isn't currently utilized in the route definitions. 
 * Make sure to use it as required or consider removing the import to clean up the code.
 * 
 */

const categoriesController = require("../controllers/categoriesController");  // Imported but not used in this module
const mercadoPagoController = require("../controllers/mercadoPagoController");
const passport = require("passport");

/**
 * Initializes the payment-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {
  // Route to create a new payment using Mercado Pago
  app.post("/api/payments/create", passport.authenticate('jwt', { session: false}), mercadoPagoController.createPayment);
  
  // More routes related to payments can be added here
  
};
