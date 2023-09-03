/**
 * Category Model.
 * 
 * This module manages the database operations related to restaurant categories.
 * It provides functionalities such as retrieving all categories and adding a new category.
 * 
 * @module CategoryModel
 * @author YourName (or your team/company name)
 * @date 2023
 */

const db = require('../config/config');
const Category = {};

/**
 * Fetches all categories from the database.
 * 
 * @param {function} result - Callback function to return the result.
 */
Category.getAll = (result) => {
    const sql = `
        SELECT
            CONVERT(id, char) AS id,
            name,
            description
        FROM
            categories
        ORDER BY 
            name
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else {
                console.log("Categorias:", data);
                result(null, data);
            }
        }
    )
}

/**
 * Creates a new restaurant category in the database.
 * 
 * @param {object} category - The category object containing details like name and description.
 * @param {function} result - Callback function to return the result.
 */
Category.create = (category, result) => {
    const sql = `
        INSERT INTO
            categories(
                name,
                description,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            category.name,
            category.description,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              console.log("Id de la nueva categoria:", res.insertId);
              result(null, res.insertId);
            }
        }
    )
}

module.exports = Category; // Exporting the Category object for external usage.
