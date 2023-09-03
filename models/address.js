/**
 * Address Model.
 * 
 * This module manages the database operations related to addresses associated with users.
 * It provides functionalities such as retrieving addresses based on user ID and adding a new address.
 * 
 */

const db = require('../config/config');
const Address = {};

/**
 * Fetches all addresses associated with a user.
 * 
 * @param {string} id_user - The ID of the user.
 * @param {function} result - Callback function to return the result.
 */
Address.findByUser = (id_user, result) => {
    const sql = `
        SELECT 
            CONVERT(id, char) AS id,
            address, 
            neighborhood,
            lat,
            lng,
            CONVERT(id_user, char) AS id_user
        FROM
            address
        WHERE
            id_user = ?
    `;

    db.query(
        sql,
        id_user,
        (err, data) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, data);
            }
        }
    )
}

/**
 * Creates a new address associated with a user.
 * 
 * @param {object} address - The address object containing details like address, neighborhood, lat, lng, and user ID.
 * @param {function} result - Callback function to return the result.
 */
Address.create = (address, result) => {
    const sql = `
        INSERT INTO
            address(
                address,
                neighborhood,
                lat,
                lng,
                id_user,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            address.address,
            address.neighborhood,
            address.lat,
            address.lng,
            address.id_user,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              console.log("Id de la nueva direccion:", res.insertId);
              result(null, res.insertId);
            }
        }
    )
}

module.exports = Address; // Exporting the Address object for external usage.
