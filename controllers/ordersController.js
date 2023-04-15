const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {

    findByStatus(req, res){

        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {

            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al listar las ordenes",
                    error: err
                });
            }

            for(const d of data){
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.delivery = JSON.parse(d.delivery);
                d.products = JSON.parse(d.products);
            }

            return res.status(201).json(data);

        });

    },

    findByDeliveryAndStatus(req, res){

        const id_delivery = req.params.id_delivery;
        const status = req.params.status;

        Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {

            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al listar las ordenes",
                    error: err
                });
            }

            for(const d of data){
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.delivery = JSON.parse(d.delivery);
                d.products = JSON.parse(d.products);
            }

            return res.status(201).json(data);

        });

    },

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

    },

    updateToDispatched(req, res) {
        const order = req.body;

        Order.updateToDispatched(order.id, order.id_delivery, (err, id_order) => {
            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al actualizar la orden",
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: "La orden se actualizo correctamente",
                data: `${id_order}`, // EL ID DE LA ORDEN
            });

        });
    },

    updateToOnTheWay(req, res) {
        const order = req.body;

        console.log('Order: ', order);

        Order.updateToOnTheWay(order.id, (err, id_order) => {
            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al actualizar la orden",
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: "La orden se actualizo correctamente",
                data: `${id_order}`, // EL ID DE LA ORDEN
            });

        });
    },

    updateLatLng(req, res) {
        const order = req.body;

        console.log('Order: ', order);

        Order.updateLatLng(order, (err, id_order) => {
            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al actualizar la orden",
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: "La orden se actualizo correctamente",
                data: `${id_order}`, // EL ID DE LA ORDEN
            });

        });
    }


}