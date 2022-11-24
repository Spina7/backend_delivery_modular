//CREAR UN NUEVO PRODUCTO(RESTAURANTE)

const  db = require('../config/config');

const Product = {};

Product.create = (product, result) => {   //CREAR UNA NUEVA CATEGORIA

    const sql = `
        INSERT INTO
            products(
                name,
                description,
                price,
                image1,
                image2,
                image3,
                id_category,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              console.log("Id de la nuevo producto:", res.insertId);
              result(null, res.insertId);
            }
        }

    )

}

Product.update = (product, result) => {   //ACTUALIZAR UNA NUEVA CATEGORIA

    const sql = `
        UPDATE
            products
        SET
            name = ?,
            description = ?,
            price = ?,
            iamge1 = ?,
            iamge2 = ?,
            iamge3 = ?,
            id_category = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.id
        ],
        (err, res) => {
            if (err) {
              console.log("Error:", err);
              result(err, null);
            } else {
              console.log("Id del producto actualizado:", product.id);
              result(null, product.id);
            }
        }

    )

}



module.exports = Product;      //EXPORTAR EL OBJETO 