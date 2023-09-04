/**
 * Address Controller.
 * 
 * This controller is responsible for handling user address-related operations
 * such as retrieving addresses by user and adding a new address.
 * 
 */

// Importing the Address model.
const Address = require('../models/address');

module.exports = {

    /**
     * Retrieves the addresses associated with a specific user.
     * 
     * @param {Object} req - Express request object, containing parameters and body.
     * @param {Object} res - Express response object used to return the result.
     */
    findByUser(req, res){
        const id_user = req.params.id_user;
        
        Address.findByUser(id_user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al tratar de obtener las direcciones",
                    error: err,
                });
            }
            return res.status(200).json(data);
        });
    },

    /**
     * Creates a new address entry.
     * 
     * @param {Object} req - Express request object, containing the address in the body.
     * @param {Object} res - Express response object used to return the result.
     */
    create(req, res){
        const address = req.body;
        
        Address.create(address, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro de la nueva direccion",
                    error: err,
                });
            }
            return res.status(201).json({
                success: true,
                message: "La direccion se creo correctamente",
                data: `${id}`, // Returning the ID of the newly created address.
            });
        });
    },
}
