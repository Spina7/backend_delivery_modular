/**
 * Orders Delivery Socket Module.
 * 
 * This module initializes socket.io namespace for handling real-time delivery order communications.
 * Clients can report their positions and delivery status, which are then broadcasted to other clients.
 * It's tailored for use cases such as real-time tracking of delivery orders.
 * 
 */

/**
 * Initializes the '/orders/delivery' namespace in socket.io.
 * 
 * @param {object} io - The socket.io server instance.
 */
module.exports = (io) => {

    // Create a namespace specifically for order deliveries
    const namespace = io.of('/orders/delivery');

    // Event handler for a new connection to the namespace
    namespace.on('connection', (socket) => {

        console.log('User connected to socket.io: /orders/delivery');

        // Event handler for 'position' event from clients reporting their position
        socket.on('position', (data) => {
            console.log('Client emitted: ', data);
            // Broadcast the position to listeners of the specific order ID
            namespace.emit(`position/${data.id_order}`, { id_order: data.id_order, lat: data.lat, lng: data.lng });
        });

        // Event handler for 'delivered' event when an order is delivered
        socket.on('delivered', (data) => {
            console.log('Delivery emitted: ', data);
            // Notify listeners of the specific order ID about the delivery status
            namespace.emit(`delivered/${data.id_order}`, { id_order: data.id_order });
        });

        // Event handler for disconnecting clients from the namespace
        socket.on('disconnect', (data) => {
            console.log('A user disconnected from socket.io');
        });
    });
}
