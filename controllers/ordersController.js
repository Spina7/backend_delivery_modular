const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {

    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al crear la orden",
                    error: err
                });
            }

            for(const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {  //VALIDACION EN CASO DE ERROR 
                        return res.status(501).json({
                            success: false,
                            message: "Hubo un error con los productos en la orden",
                            error: err,
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: "La orden se creo correctamente",
                data: `${id}`, // EL ID DE LA NUEVA ORDEN
            });

        });

    }
}