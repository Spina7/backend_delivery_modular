/**
 * Restaurant Controller
 * 
 * This module provides functionalities to manage restaurants, 
 * including creating a new restaurant and fetching all available restaurants.
 * 
 */

const Restaurant = require('../models/restaurant');

module.exports = {

    /**
     * Creates a new restaurant.
     * 
     * This function takes in the request body containing restaurant details and 
     * passes it to the Restaurant model for creation. Upon success, the created 
     * restaurant ID is returned.
     * 
     * @function
     * @param {Object} req - Express request object containing restaurant details in the body.
     * @param {Object} res - Express response object.
     * @returns {Object} JSON response with success status, message, and the ID of the newly created restaurant (if successful).
     */
    create(req, res) {

        const restaurant = req.body;

        Restaurant.create(restaurant, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro del restaurante",
                    error: err,
                });
            }

            return res.status(201).json({
                success: true,
                message: "El restaurante se creo correctamente",
                data: `${id}`, // The ID of the newly created restaurant
            });

        });

    },

    /**
     * Fetches all available restaurants.
     * 
     * This function retrieves all restaurants present in the database. It does not 
     * take any parameters and returns a list of all restaurants.
     * 
     * @function
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Array<Object>} An array of restaurant objects.
     */
    getAll(req, res) {
        Restaurant.getAll((err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar los restaurantes",
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },

    /**
     * Fetches the count of all available restaurants.
     * 
     * This function retrieves the count of all restaurants present in the database. 
     * It does not take any parameters and returns the count of restaurants.
     * 
     * @function
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} JSON response with the count of restaurants.
     */
    getCount(req, res) {
        Restaurant.getCount((err, count) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de obtener el conteo de restaurantes",
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: "Conteo de restaurantes obtenido exitosamente",
                count: count
            });

        });
    }

}
