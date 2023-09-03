/**
 * OrderHasProducts Model.
 * 
 * This module manages the database operations related to the order-product relationship.
 * It particularly manages the junction table that maintains a many-to-many relationship
 * between orders and products.
 * 
 */

const db = require('../config/config');
const OrderHasProducts = {};

/**
 * Inserts a new entry in the order-product relationship table.
 * 
 * This function maps an order with a specific product and its quantity.
 * 
 * @param {number} id_order - The ID of the order.
 * @param {number} id_product - The ID of the product.
 * @param {number} quantity - The quantity of the product in the order.
 * @param {function} result - Callback function to return the result.
 */
OrderHasProducts.create = (id_order, id_product, quantity, result) => {
    const sql = `
        INSERT INTO
            order_has_products(
                id_order,
                id_product,
                quantity,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            id_order,
            id_product,
            quantity,
            new Date(),    
            new Date(),
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              console.log("Id de la nueva orden_has_products:", res.insertId);
              result(null, res.insertId);
            }
        }
    )
}

module.exports = OrderHasProducts; // Exporting the OrderHasProducts object for external usage.
