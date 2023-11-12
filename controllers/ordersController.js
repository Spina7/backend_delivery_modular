/**
 * Order Controller.
 * 
 * This controller is responsible for managing different functionalities related to orders:
 * - Retrieval of orders based on their status and other parameters.
 * - Creation of new orders.
 * - Updating the status of orders.
 * 
 */

const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const User = require('../models/user');
const PushNotificationsController = require('../controllers/pushNotificationsController');

module.exports = {

    /**
     * Retrieve orders by their status.
     * 
     * @param {Object} req - Express request object containing the order status in the parameters.
     * @param {Object} res - Express response object used to return the result.
     */
    findByStatus(req, res){

        const id_restaurant = req.params.id_restaurant;
        const status = req.params.status;

        Order.findByStatus(id_restaurant, status, (err, data) => {

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

    /**
     * Retrieve orders by the delivery person and their status.
     * 
     * @param {Object} req - Express request object containing the delivery ID and order status in the parameters.
     * @param {Object} res - Express response object used to return the result.
     */
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

    /**
     * Retrieve orders by the client and their status.
     * 
     * @param {Object} req - Express request object containing the client ID and order status in the parameters.
     * @param {Object} res - Express response object used to return the result.
     */
    findByClientAndStatus(req, res){

        const id_client = req.params.id_client;
        const status = req.params.status;

        Order.findByClientAndStatus(id_client, status, (err, data) => {

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

    /**
     * Create a new order entry in the system.
     * 
     * @param {Object} req - Express request object containing order details.
     * @param {Object} res - Express response object used to return the result.
     */
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

    /**
     * Update order status to dispatched and notify the delivery person.
     * 
     * @param {Object} req - Express request object containing order ID and delivery person's ID.
     * @param {Object} res - Express response object used to return the result.
     */
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

            User.findById(order.id_delivery, (err, user) => {

                if (user !== undefined && user !== null) {  //VALIDACION EN CASO DE ERROR 
                    console.log('NOTIFICATION TOKEN', user.notification_token);
                    PushNotificationsController.sendNotification(user.notification_token, {
                        title: 'PEDIDO ASIGNADO',
                        body: 'Te han asignado un nuevo pedido',
                        id_notification: '1'
                    });
                }

            });

            return res.status(201).json({
                success: true,
                message: "La orden se actualizo correctamente",
                data: `${id_order}`, // EL ID DE LA ORDEN
            });

        });
    },

    /**
     * Update order status to indicate it's on the way.
     * 
     * @param {Object} req - Express request object containing order ID.
     * @param {Object} res - Express response object used to return the result.
     */
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

    /**
     * Update order status to indicate it's delivered.
     * 
     * @param {Object} req - Express request object containing order ID.
     * @param {Object} res - Express response object used to return the result.
     */
    updateToDelivered(req, res) {
        const order = req.body;

        console.log('Order: ', order);

        Order.updateToDelivered(order.id, (err, id_order) => {
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

    /**
     * Update the latitude and longitude for a specific order.
     * 
     * @param {Object} req - Express request object containing order details.
     * @param {Object} res - Express response object used to return the result.
     */
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
