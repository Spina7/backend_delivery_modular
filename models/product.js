//CREAR UN NUEVO PRODUCTO(RESTAURANTE)
const db = require('../config/config');

const Product = {};


/*
Product.getRestaurantIds = (result) => {
    const sql = `
      SELECT DISTINCT P.id_restaurant
      FROM products AS P
    `;
  
    db.query(sql, (err, data) => {
      if (err) {
        console.error("Error:", err);
        result(err, null);
      } else {
        console.log("IDs de restaurantes:", data);
        result(null, data.map((item) => item.id_restaurant.toString())); // Mapea los resultados a una lista de IDs como cadenas
      }
    });
  };

  
  Product.findByIdRestaurant = (id_restaurant, result) => {
    const sql = `
        SELECT
            CONVERT(P.id, char) AS id,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            CONVERT(P.id_category, char) AS id_category 
        FROM
            products AS P
        WHERE
            P.id_restaurant = ? 
    `;

    db.query(sql, [id_restaurant])
        .then(data => {
            console.log("Productos:", data);
            result(null, data);
        })
        .catch(err => {
            console.error("Error:", err);
            result(err, null);
        });
};
*/

Product.findByCategory = (id_category, id_restaurant, result) => {
    const sql = `
        SELECT
            CONVERT(P.id, char) AS id,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            CONVERT(P.id_category, char) AS id_category,
            CONVERT(P.id_restaurant, char) AS id_restaurant
        FROM
            products as P
        WHERE
            P.id_category = ? and P.id_restaurant = ?
    `;

    db.query(
        sql,
        [
            id_category, 
            id_restaurant
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

Product.findByNameAndCategory = (name, id_category, result) => {
    const sql = `
        SELECT
            CONVERT(P.id, char) AS id,
            CONVERT(P.id_resturant, char) AS id_restaurant,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            CONVERT(P.id_category, char) AS id_category 
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
            id_restaurant,
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
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [   
            product.id_restaurant,
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
        description = ?,
        price = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
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


module.exports = Product;