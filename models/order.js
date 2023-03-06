//CREAR UNA NUEVA ORDEN
const  db = require('../config/config');

const Order = {};

Order.create = (order, result) => {   //CREAR UNA NUEVA ORDEN

    const sql = `
        INSERT INTO
            orders(
                id_client,
                id_address,
                status,
                timestamp,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            order.id_client,
            order.id_address,
            'PAGADO',   //1. PAGADO 2. DESPACHADO 3. EN CAMINO 4. ENTREGADO
            Date.now(),
            new Date(),    
            new Date(),
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              console.log("Id de la nueva orden:", res.insertId);
              result(null, res.insertId);
            }
        }

    )

}



module.exports = Order;      //EXPORTAR EL OBJETO 