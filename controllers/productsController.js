/**
 * Product Controller
 * 
 * This module is responsible for handling all product-related operations, 
 * including fetching products by category or name, and creating a new product 
 * with associated images.
 * 
 */

const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    /**
     * Fetches a list of products based on the provided category ID.
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    findByCategory(req, res){
        const id_category = req.params.id_category;

        Product.findByCategory( id_category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar los productos",
                    error: err
                });
            }

            return res.status(200).json(data); // Changed to 200 for successful read operations
        });
    },
    getAllProducts(req, res) {
        Product.findAll((err, products) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Error retrieving all products.",
              error: err,
            });
          }
          return res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            data: products,
          });
        });
      },

    /**
     * Searches for products based on a provided product name and category ID.
     * 
     * @function
     * @async
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    findByNameAndCategory(req, res){
        const id_category = req.params.id_category;
        const name = req.params.name;

        Product.findByNameAndCategory( name, id_category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al momento de listar los productos",
                    error: err
                });
            }

            return res.status(200).json(data); // Changed to 200 for successful read operations
        });
    },

    update(req, res) {
        // Get the user data from the request body
        const productData = req.body;

        // Call the User.update method to update the user in the database
        Product.update(productData, (err, productId) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error updating product.",
                    error: err,
                });
            }

            // If update is successful, fetch the updated user data and return it
            Product.findById(productId, (err, updatedProduct) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error fetching updated product data.",
                        error: err,
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Product updated successfully.",
                    data: updatedProduct,
                });
            });
        });
    },

    /**
     * Creates a new product entry in the database.
     * For each provided image, it uploads the image to cloud storage,
     * stores its URL, and updates the product entry in the database.
     * 
     * @function
     * @async
     * @param {Object} req - Express request object, containing product details and associated images.
     * @param {Object} res - Express response object.
     */
    create(req, res) {

        const product = req.body;

        Product.create(product, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro del producto",
                    error: err,
                });
            }

            return res.status(201).json({
                success: true,
                message: "El producto se creo correctamente",
                data: `${id}`, // The ID of the newly created restaurant
            });

        });

    },

    deleteProduct(req, res) {
        const productId = req.params.id; // Assuming you're passing the user ID as a URL parameter

        Product.delete(productId, (err, id) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).json({
                        success: false,
                        message: `No product found with ID ${productId}`,
                        error: err,
                    });
                } else {
                    return res.status(500).json({
                        success: false,
                        message: "Error deleting product.",
                        error: err,
                    });
                }
            }

            return res.status(200).json({
                success: true,
                message: `Product with ID ${id} was deleted successfully.`,
                data: id,
            });
        });
    }
}
