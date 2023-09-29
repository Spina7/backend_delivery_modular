/**
 * User Routes Module.
 * 
 * This module defines the routes related to user operations such as registration, login,
 * and user profile updates. It incorporates authentication using JSON Web Tokens (JWT)
 * and also handles routes that involve image uploads.
 * 
 */

const homeController = require("../controllers/homeController");


/**
 * Initializes the user-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {

app.get("/api/home", homeController.getCounts);


};
