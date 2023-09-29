//CREAR UN NUEVO(RESTAURANTE)
const db = require('../config/config');

const Restaurant = {};

Restaurant.findAll = (result) => {
    const sql = `
        SELECT
            CONVERT(R.id, char) AS id,
            R.name,
            R.address,
            R.initial_working_hour,
            R.ending_working_hour,
            R.created_at,
            R.updated_at
        FROM
            restaurants as R
        ORDER BY 
            R.name ASC;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else {
                console.log("Restaurantes:", data);
                result(null, data);
            }
        }
    );
}


Restaurant.getAll = (result) => {
    const sql = `
        SELECT
            CONVERT(R.id, char) AS id,
            R.name,
            R.address,
            R.initial_working_hour,
            R.ending_working_hour
        FROM
            restaurants as R
        ORDER BY 
            name;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else {
                console.log("Restaurantes:", data);
                result(null, data);
            }
        }
    );
}

Restaurant.create = (restaurant, result) => {

    const sql = `
    INSERT INTO
        restaurants(
            name,
            address,
            initial_working_hour,
            ending_working_hour,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            restaurant.name,
            restaurant.address,
            restaurant.initial_working_hour,
            restaurant.ending_working_hour,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo restaurante:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Restaurant.update = (restaurant, result) => {

    const sql = `
    UPDATE
        restaurants
    SET
        name = ?,
        address = ?,
        initial_working_hour = ?,
        ending_working_hour = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            restaurant.name,
            restaurant.address,
            restaurant.initial_working_hour,
            restaurant.ending_working_hour,
            new Date(),
            restaurant.id,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del restaurante actualizado:', restaurant.id);
                result(null, restaurant.id);
            }
        }

    )

}

Restaurant.getCount = (result) => {
    const sql = `
        SELECT COUNT(*) as count 
        FROM restaurants as R;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log("Error:", err);
                result(err, null);
            } else {
                console.log("Total Restaurants:", data[0].count);
                result(null, data[0].count);
            }
        }
    );
}



module.exports = Restaurant;