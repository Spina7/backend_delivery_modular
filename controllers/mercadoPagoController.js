const mercadopago = require('mercadopago');
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');


mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-2935131037484647-052100-f04940cd525ace2d2ee3785a8f3303fe-1379153754'
});

module.exports = {

    async createPayment(req, res){

        let payment = req.body;

        console.log('PAYMENT: ', payment);

        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: payment.installments,
            //description: 'Descripcion del producto',
            payer: {
                email: payment.payer.email,
            },
        }

        const data = await mercadopago.payment.create(payment_data).catch((err) => {
            console.log('Error de mercado pago', err);
            return res.status(501).json({
                success: false,
                message: "Error al crear el pago",
                error: err
            });
        });

        if(data.body !== null && data.body !== undefined){

            const order = payment.order;

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
                    data: data.response
                });
        
            });

            
        }
    }

}