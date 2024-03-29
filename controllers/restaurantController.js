/**
 * Restaurant Controller
 * 
 * This module provides functionalities to manage restaurants, 
 * including creating a new restaurant and fetching all available restaurants.
 * 
 */

const Restaurant = require('../models/restaurant');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    
    findByCategory(req, res){

        const id_category = req.params.id_category;

        Restaurant.findByCategory( id_category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar los restaurantes",
                    error: err
                });
            }

            return res.status(200).json(data); // Changed to 200 for successful read operations
        });
    },
    
    
     /**
     * Searches for restaurants based on a provided product name and category ID.
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    /*
     findByNameAndCategory(req, res){
        const id_category = req.params.id_category;
        const name = req.params.name;

        Restaurant.findByNameAndCategory( name, id_category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar los restaurantes",
                    error: err
                });
            }

            return res.status(200).json(data); // Changed to 200 for successful read operations
        });
    },
    */

    findByName(req, res){
        const name = req.params.name;

        Restaurant.findByName( name, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar los restaurantes",
                    error: err
                });
            }

            return res.status(200).json(data); // Changed to 200 for successful read operations
        });
    },

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
    }

}
