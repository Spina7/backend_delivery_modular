//CREAR UN NUEVO PRODUCTO(RESTAURANTE)
const db = require('../config/config');

const Product = {};

Product.findAll = (result) => {
    const sql = `
        SELECT
            CONVERT(P.id, char) AS id,
            P.name,
            CONVERT(P.id_restaurant, char) AS id_restaurant,
            CONVERT(P.id_category, char) AS id_category,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            P.created_at,
            P.updated_at
        FROM
            products as P
        ORDER BY
            P.updated_at
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else {
                console.log("Products:", data);
                result(null, data);
            }
        }
    );
}

Product.findById = (id, result) => {
    const sql = `
    SELECT
            CONVERT(P.id, char) AS id,
            P.name,
            CONVERT(P.id_restaurant, char) AS id_restaurant,
            CONVERT(P.id_category, char) AS id_category,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            P.created_at,
            P.updated_at
        FROM
            products as P
        WHERE
            P.id_category = ?
        GROUP BY 
            P.id
    `;
  
    db.query(sql, [id], (err, user) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Producto obtenido:", user[0]);
        result(null, user[0]);
      }
    });
  }


Product.findByCategory = (id_category, result) => {
    const sql = `
        SELECT
            CONVERT(P.id, char) AS id,
            P.name,
            CONVERT(P.id_restaurant, char) AS id_restaurant,
            CONVERT(P.id_category, char) AS id_category,
            P.description,
            P.image1,
            P.image2,
            P.image3
        FROM
            products as P
        WHERE
            P.id_category = ?
    `;

    db.query(
        sql,
        [id_category],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res);
                result(null, res);
            }
        }
    );
}

Product.findByNameAndCategory = (name, id_category, result) => {
    const sql = `
        SELECT
            CONVERT(P.id, char) AS id,
            P.name,
            CONVERT(P.id_restaurant, char) AS id_restaurant,
            CONVERT(P.id_category, char) AS id_category,
            P.description,
            P.image1,
            P.image2,
            P.image3
        FROM
            products as P
        WHERE
            P.id_category = ? AND LOWER(P.name) LIKE ?
    `;

    db.query(
        sql,
        [
            id_category,
            `%${name.toLowerCase()}%` 
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res);
                result(null, res);
            }
        }
    );
}


Product.create = (product, result) => {

    const sql = `
    INSERT INTO
        products(
            name,
            id_restaurant,
            id_category,
            description,
            price,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            product.name,
            product.id_restaurant,
            product.id_category,
            product.description,
            product.price,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        id_restaurant = ?,
        id_category = ?,
        description = ?,
        price = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            product.name,
            product.id_restaurant,
            product.id_category,
            product.description,
            product.price,
            new Date(),
            product.id,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }

    )

}

Product.delete = (id, result) => {
    const sql = `
      DELETE FROM
        products
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
          console.log("Producto Eliminado con ID:", id);
          result(null, id);
        }
      }
    });
  }


module.exports = Product;