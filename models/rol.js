/**
 * Rol Model.
 * 
 * This module manages the roles assigned to users. It provides 
 * functions for creating and assigning roles to specific users.
 * 
 * @module RolModel
 * @author YourName (or your team/company name)
 * @date 2023
 */

// Import the database configuration.
const db = require('../config/config');

const Rol = {};

/**
 * Assigns a specific role to a user.
 * 
 * @param {number} id_user - The ID of the user.
 * @param {number} id_rol - The ID of the role to be assigned.
 * @param {function} result - Callback function to return the result.
 */
Rol.create = (id_user, id_rol, result) => {
    // SQL query string for inserting a new user-role relation.
    const sql = `
        INSERT INTO
            user_has_roles(
                id_user,
                id_rol,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?)
    `;

    // Execute the SQL query.
    db.query(
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Assigned Role ID:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

// Export the Rol model for external usage.
module.exports = Rol;
