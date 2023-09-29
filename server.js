/**
 * Main server configuration file for the application.
 * This file sets up the Express server, middleware, routes, and socket.io configurations.
 */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");
const io = require("socket.io")(server);
const mercadopago = require('mercadopago');

/**
 * Configure MercadoPago with sandbox settings and access token.
 * Remember to replace access token with environment variable in production.
 */
mercadopago.configure({
  sandbox: true,
  access_token: 'TEST-2935131037484647-052100-f04940cd525ace2d2ee3785a8f3303fe-1379153754'
});

// Socket Import
const ordersSocket = require("./sockets/ordersSocket");

// Route Imports
const usersRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const addressRoutes = require("./routes/addressRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const mercadoPagoRoutes = require("./routes/mercadoPagoRoutes");

// Port configuration, defaults to 3000 if not set in environment
const port = process.env.PORT || 3002;

// Middleware Configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration import
require("./config/passport")(passport);

// Disabling 'x-powered-by' header for security reasons
app.disable("x-powered-by");

app.set("port", port);

/**
 * Socket.io Configuration
 */
ordersSocket(io);

/**
 * Multer configuration for memory storage.
 * Useful for temporary uploads or processing before saving to disk/cloud.
 */
const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * API Route Configuration
 */
usersRoutes(app, upload);
categoriesRoutes(app);
productRoutes(app, upload);
addressRoutes(app);
ordersRoutes(app);
restaurantRoutes(app);
mercadoPagoRoutes(app);

// Start server listening
server.listen(port, "0.0.0.0", function () {
  console.log(`NodeJS application started on port ${port}`);
});

/**
 * Error handling middleware.
 * This catches and logs errors, then sends a generic error response.
 */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});

// Default route for checking server status
app.get("/", (req, res) => {
  res.send("Root path of the backend server.");
});

module.exports = {
  app: app,
  server: server,
};

/**
 * HTTP Status Codes:
 * 200 - Successful Response
 * 404 - URL Not Found
 * 500 - Internal Server Error
 */
