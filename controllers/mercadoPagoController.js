/**
 * Payment Controller.
 * 
 * This controller manages the payments using MercadoPago.
 * It allows for the creation of a new payment, and also takes care of processing an order associated with that payment.
 * 
 * @module PaymentController
 * @author YourName (or your team/company name)
 * @date 2023
 */

const mercadopago = require('mercadopago');
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const PushNotificationsController = require('../controllers/pushNotificationsController');
const User = require('../models/user');

// MercadoPago Configuration.
mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-2935131037484647-052100-f04940cd525ace2d2ee3785a8f3303fe-1379153754'
});

module.exports = {

    /**
     * Creates a payment using the MercadoPago service.
     * 
     * Processes the order associated with the payment and sends a notification to all admins.
     * 
     * @param {Object} req - Express request object, containing payment details in the body.
     * @param {Object} res - Express response object used to return the result.
     */
    async createPayment(req, res){

        let payment = req.body;

        console.log('PAYMENT: ', payment);

        // Payment data for MercadoPago.
        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: payment.installments,
            payer: {
                email: payment.payer.email,
            },
        }

        // Create payment using MercadoPago API.
        const data = await mercadopago.payment.create(payment_data).catch((err) => {
            console.log('MercadoPago Error', err);
            return res.status(501).json({
                success: false,
                message: "Error al crear el pago",
                error: err
            });
        });

        if(data.body !== null && data.body !== undefined){

            const order = payment.order;

            // Create an order entry in the database.
            Order.create(order, async (err, id) => {

                if (err) {  
                    return res.status(501).json({
                        success: false,
                        message: "Hubo un error al crear la orden",
                        error: err
                    });
                }

                // Link products with the created order.
                for(const product of order.products) {
                    await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                        if (err) {  
                            return res.status(501).json({
                                success: false,
                                message: "Hubo un error con los productos en la orden",
                                error: err,
                            });
                        }
                    });
                }

                // Send a push notification to all admins about the new order.
                User.findAdmins( (err, users) => {

                    if (users !== undefined && users !== null) {  
                        
                        if(users.length > 0){
                            let tokens = [];
                            users.forEach( u => {
                                tokens.push(u.notification_token);
                            });

                            console.log('TOKENS', tokens);
                            PushNotificationsController.sendNotificationToMultipleDevices(tokens, {
                                title: 'COMPRA REALIZADA',
                                body: 'Un cliente ha realizado una compra',
                                id_notification: '2'
                            });
                        }
                        
                    }
    
                });
        
                return res.status(201).json({
                    success: true,
                    message: "La orden se creo correctamente",
                    data: data.response
                });
        
            });
        }
    }
}