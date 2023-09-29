/**
 * User Routes Module.
 * 
 * This module defines the routes related to user operations such as registration, login,
 * and user profile updates. It incorporates authentication using JSON Web Tokens (JWT)
 * and also handles routes that involve image uploads.
 * 
 */

const usersController = require("../controllers/usersController");
const passport = require("passport");

/**
 * Initializes the user-related routes.
 * 
 * @param {object} app - The express application instance.
 * @param {object} upload - The multer middleware for handling file uploads.
 */
module.exports = (app, upload) => {
  // User creation routes
  app.post("/api/users/create", usersController.register);
  app.post("/api/users/createWithImage", upload.array("image", 1), usersController.registerWithImage);
  
  // User login route
  app.post("/api/users/login", usersController.login);

  // Restricted routes for updating user details with JWT authentication
  app.put("/api/users/update", passport.authenticate('jwt', { session: false}), upload.array("image", 1), usersController.updateWithImage);
  app.put("/api/users/updateWithoutImage", passport.authenticate('jwt', { session: false}), usersController.updateWithoutImage);
  
  // Route for updating user's notification token
  app.put("/api/users/updateNotificationToken", passport.authenticate('jwt', { session: false}), upload.array("image", 1), usersController.updateNotificationToken);

  // Restricted route for retrieving delivery men details
  app.get("/api/users/findDeliveryMen", passport.authenticate('jwt', { session: false}), usersController.findDeliveryMen);
  app.get("/api/users", usersController.getAllUsers);

};
