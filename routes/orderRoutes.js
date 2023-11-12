/**
 * Orders Routes Module.
 * 
 * This module defines the routes associated with order operations. It includes functionalities 
 * like creating new orders, retrieving orders based on various criteria (status, associated delivery person, 
 * or client), and updating the status of orders. All routes in this module are protected with 
 * JSON Web Tokens (JWT) to ensure authenticated and authorized access.
 * 
 */

const OrdersController = require("../controllers/ordersController");
const passport = require("passport");

/**
 * Initializes the order-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {
  // Route to create a new order
  app.post("/api/orders/create", passport.authenticate('jwt', { session: false}), OrdersController.create);
  
  // Routes to retrieve orders based on various criteria
  app.get("/api/orders/findByStatus/:id_restaurant/:status", passport.authenticate('jwt', { session: false}), OrdersController.findByStatus);
  app.get("/api/orders/findByDeliveryAndStatus/:id_delivery/:status", passport.authenticate('jwt', { session: false}), OrdersController.findByDeliveryAndStatus);
  app.get("/api/orders/findByClientAndStatus/:id_client/:status", passport.authenticate('jwt', { session: false}), OrdersController.findByClientAndStatus);

  // Routes to update the status of orders
  app.put("/api/orders/updateToDispatched", passport.authenticate('jwt', { session: false}), OrdersController.updateToDispatched);
  app.put("/api/orders/updateToOnTheWay", passport.authenticate('jwt', { session: false}), OrdersController.updateToOnTheWay);
  app.put("/api/orders/updateLatLng", passport.authenticate('jwt', { session: false}), OrdersController.updateLatLng);
  app.put("/api/orders/updateToDelivered", passport.authenticate('jwt', { session: false}), OrdersController.updateToDelivered);
};
