/**
 * Category Controller.
 * 
 * This controller manages operations related to restaurant categories.
 * It allows for the creation of new categories and retrieval of all existing categories.
 * 
 */

// Importing the Category model.
const Category = require('../models/category');

module.exports = {

    /**
     * Creates a new category entry.
     * 
     * @param {Object} req - Express request object, containing the category details in the body.
     * @param {Object} res - Express response object used to return the result.
     */
    create(req, res){
        const category = req.body;

        Category.create(category, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro de la categoria",
                    error: err,
                });
            }

            return res.status(201).json({
                success: true,
                message: "La categoria se creo correctamente",
                data: `${id}`, // Returning the ID of the newly created category.
            });
        });
    },

    /**
     * Retrieves a list of all categories.
     * 
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object used to return the result.
     */
    getAll(req, res){
        Category.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar las categorias",
                    error: err,
                });
            }

            return res.status(200).json(data);
        });
    }

}
