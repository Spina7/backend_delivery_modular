const Restaurant = require('../models/restaurant');

module.exports = {

    create(req, res){

        const restaurant = req.body;

        Restaurant.create(restaurant, (err, id) => {

            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro del restaurante",
                    error: err,
                });
            }

            return res.status(201).json({
                success: true,
                message: "El restaurante se creo correctamente",
                data: `${id}`, // EL ID DE LA NUEVO 
            });

        });

    },

    getAll(req, res){
        Restaurant.getAll((err, data) => {

            if (err) {  //VALIDACION EN CASO DE ERROR 
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