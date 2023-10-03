//CREAR UNA NUEVA ORDEN
const  db = require('../config/config');

const Order = {};

Order.findAll = (result) => {
  
    const sql = `
      SELECT
        CONVERT(O.id, char) AS order_id,
        CONVERT(O.id_client, char) AS client_id,
        CONVERT(O.id_address, char) AS address_id,
        CONVERT(O.id_delivery, char) AS delivery_id,
        O.status,
        O.timestamp,
        O.lat,
        O.lng,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', CONVERT(P.id, char),
            'name', P.name,
            'description', P.description,
            'image1', P.image1,
            'image2', P.image2,
            'image3', P.image3,
            'price', P.price,
            'quantity', OHP.quantity
          )
        ) AS products
      FROM
        orders AS O
      INNER JOIN
        order_has_products AS OHP
      ON 
        O.id = OHP.id_order
      INNER JOIN
        products AS P
      ON 
        P.id = OHP.id_product
      GROUP BY 
        O.id
      ORDER BY
        O.id DESC
    `;
  
    db.query(sql, (err, orders) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Orders obtained:", orders);
        result(null, orders);
      }
    });
};

Order.findById = (id, result) => {
    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        O.id_client, 
        O.id_delivery,
        O.id_address,
        O.lat,
        O.lng,
        O.status,
        O.timestamp,
        O.created_at,
        O.updated_at
      FROM
        orders AS O
      WHERE
        O.id = ?
    `;
  
    db.query(sql, [id], (err, order) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Orden obtenida:", order[0]);
        result(null, order[0]);
      }
    });
  };


Order.findByStatus = (status, result) => {

    const sql = `
        SELECT 
            CONVERT(O.id, char) AS id, 
            CONVERT(O.id_client, char) AS id_client,
            CONVERT(O.id_address, char) AS id_address,
            CONVERT(O.id_delivery, char) AS id_delivery,
            O.status,
            O.timestamp,
            O.lat,
            O.lng,
            JSON_OBJECT(
                'id', CONVERT(A.id, char),
                'address', A.address,
                'neighborhood', A.neighborhood,
                'lat', A.lat,
                'lng', A.lng
            ) AS address,
            JSON_OBJECT(
                'id', CONVERT(U.id, char),
                'name', U.name,
                'lastname', U.lastname,
                'image', U.image,
                'phone', U.phone
            ) AS client,
            JSON_OBJECT(
                'id', CONVERT(U2.id, char),
                'name', U2.name,
                'lastname', U2.lastname,
                'image', U2.image,
                'phone', U2.phone
            ) AS delivery,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(P.id, char),
                    'name', P.name,
                    'description', P.description,
                    'image1', P.image1,
                    'image2', P.image2,
                    'image3', P.image3,
                    'price', P.price,
                    'quantity', OHP.quantity
                )
            ) AS products
        FROM
            orders AS O
        INNER JOIN 
            users AS U
        ON 
            U.id = O.id_client
        LEFT JOIN
            users AS U2
        ON
            U2.id = O.id_delivery
        INNER JOIN 
            address AS A 
        ON 
            A.id = O.id_address
        INNER JOIN
            order_has_products AS OHP
        ON 
            OHP.id_order = O.id
        INNER JOIN
            products AS P
        ON 
            P.id = OHP.id_product
        WHERE 
            status = ?
        GROUP BY  
            O.id
        ORDER BY
            O.timestamp;
    `;

    db.query(
        sql,
        status,
        (err, data) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, data);
            }
        }
    )

}


Order.findByDeliveryAndStatus = (id_delivery, status, result) => {

    const sql = `
        SELECT 
            CONVERT(O.id, char) AS id, 
            CONVERT(O.id_client, char) AS id_client,
            CONVERT(O.id_address, char) AS id_address,
            CONVERT(O.id_delivery, char) AS id_delivery,
            O.status,
            O.timestamp,
            O.lat,
            O.lng,
            JSON_OBJECT(
                'id', CONVERT(A.id, char),
                'address', A.address,
                'neighborhood', A.neighborhood,
                'lat', A.lat,
                'lng', A.lng
            ) AS address,
            JSON_OBJECT(
                'id', CONVERT(U.id, char),
                'name', U.name,
                'lastname', U.lastname,
                'image', U.image,
                'phone', U.phone
            ) AS client,
            JSON_OBJECT(
                'id', CONVERT(U2.id, char),
                'name', U2.name,
                'lastname', U2.lastname,
                'image', U2.image,
                'phone', U2.phone
            ) AS delivery,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(P.id, char),
                    'name', P.name,
                    'description', P.description,
                    'image1', P.image1,
                    'image2', P.image2,
                    'image3', P.image3,
                    'price', P.price,
                    'quantity', OHP.quantity
                )
            ) AS products
        FROM
            orders AS O
        INNER JOIN 
            users AS U
        ON 
            U.id = O.id_client
        LEFT JOIN
            users AS U2
        ON
            U2.id = O.id_delivery
        INNER JOIN 
            address AS A 
        ON 
            A.id = O.id_address
        INNER JOIN
            order_has_products AS OHP
        ON 
            OHP.id_order = O.id
        INNER JOIN
            products AS P
        ON 
            P.id = OHP.id_product
        WHERE 
            O.id_delivery = ? AND O.status = ?
        GROUP BY  
            O.id
        ORDER BY
            O.timestamp;
    `;

    db.query(
        sql,
        [
            id_delivery,
            status
        ],
        (err, data) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, data);
            }
        }
    )

}


Order.findByClientAndStatus = (id_client, status, result) => {

    const sql = `
        SELECT 
            CONVERT(O.id, char) AS id, 
            CONVERT(O.id_client, char) AS id_client,
            CONVERT(O.id_address, char) AS id_address,
            CONVERT(O.id_delivery, char) AS id_delivery,
            O.status,
            O.timestamp,
            O.lat,
            O.lng,
            JSON_OBJECT(
                'id', CONVERT(A.id, char),
                'address', A.address,
                'neighborhood', A.neighborhood,
                'lat', A.lat,
                'lng', A.lng
            ) AS address,
            JSON_OBJECT(
                'id', CONVERT(U.id, char),
                'name', U.name,
                'lastname', U.lastname,
                'image', U.image,
                'phone', U.phone
            ) AS client,
            JSON_OBJECT(
                'id', CONVERT(U2.id, char),
                'name', U2.name,
                'lastname', U2.lastname,
                'image', U2.image,
                'phone', U2.phone
            ) AS delivery,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(P.id, char),
                    'name', P.name,
                    'description', P.description,
                    'image1', P.image1,
                    'image2', P.image2,
                    'image3', P.image3,
                    'price', P.price,
                    'quantity', OHP.quantity
                )
            ) AS products
        FROM
            orders AS O
        INNER JOIN 
            users AS U
        ON 
            U.id = O.id_client
        LEFT JOIN
            users AS U2
        ON
            U2.id = O.id_delivery
        INNER JOIN 
            address AS A 
        ON 
            A.id = O.id_address
        INNER JOIN
            order_has_products AS OHP
        ON 
            OHP.id_order = O.id
        INNER JOIN
            products AS P
        ON 
            P.id = OHP.id_product
        WHERE 
            O.id_client = ? AND O.status = ?
        GROUP BY  
            O.id
        ORDER BY
            O.timestamp;
    `;

    db.query(
        sql,
        [
            id_client,
            status
        ],
        (err, data) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, data);
            }
        }
    )

}



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

Order.updateToDispatched = (id_order, id_delivery, result) => {
    const sql = `
        UPDATE 
            orders
        SET
            id_delivery = ?,
            status = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            id_delivery,
            'DESPACHADO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, id_order);
            }
        }
    )
}

Order.updateToOnTheWay = (id_order, result) => {
    const sql = `
        UPDATE 
            orders
        SET
            status = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            'EN CAMINO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, id_order);
            }
        }
    )
}

Order.updateToDelivered = (id_order, result) => {
    const sql = `
        UPDATE 
            orders
        SET
            status = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            'ENTREGADO',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, id_order);
            }
        }
    )
}

Order.updateLatLng = (order, result) => {
    const sql = `
        UPDATE 
            orders
        SET
            lat = ?,
            lng = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            order.lat,
            order.lng,
            new Date(),
            order.id
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              result(null, order.id);
            }
        }
    )
}

Order.delete = (id, result) => {
    const sql = `
      DELETE FROM
        orders
      WHERE
        id = ? 
    `;
  
    db.query(sql, [id], (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        if (res.affectedRows == 0) {
          // No rows were deleted, meaning no user was found with the given ID
          result({ kind: "not_found" }, null);
        } else {
          console.log("Orden Eliminada con ID:", id);
          result(null, id);
        }
      }
    });
  }

  Order.update = async (order, result) => {
  
    let sql, parameters;
    
      sql = `
        UPDATE
          orders
        SET
          id_client = ?,
          status = ?,
          id_address = ?
        WHERE
          id = ? 
      `;
  
      parameters = [
        order.client_id,
        order.status,
        order.address_id,
        order.order_id
      ];
    
  
    db.query(
      sql,
      parameters,
      (err, res) => {
        if (err) {
          console.log("Error:", err);
          result(err, null);
        } else {
          console.log("Orden Actualizada", order.order_id);
          result(null, order.order_id);
        }
      }
    );
  }

  



module.exports = Order;      //EXPORTAR EL OBJETO 