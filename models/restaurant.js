//CREAR UN NUEVO(RESTAURANTE)
const db = require('../config/config');

const Restaurant = {};

Restaurant.findAll = (result) => {
    const sql = `
        SELECT
            CONVERT(R.id, char) AS id,
            R.name,
            R.address,
            R.phone,
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
            R.phone,
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
            phone,
            initial_working_hour,
            ending_working_hour,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [
            restaurant.name,
            restaurant.address,
            restaurant.phone,
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
        phone = ?,
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
            restaurant.phone,
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

Restaurant.findById = (id, result) => {
    const sql = `
    SELECT
        CONVERT(R.id, char) AS id,
        R.name, 
        R.address,
        R.initial_working_hour,
        R.ending_working_hour,
        R.phone
      FROM
        restaurants AS R
      WHERE
        R.id = ?
      GROUP BY 
        R.id
    `;
  
    db.query(sql, [id], (err, user) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Usuario obtenido:", user[0]);
        result(null, user[0]);
      }
    });
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

Restaurant.delete = (id, result) => {
    const sql = `
      DELETE FROM
        restaurants
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
          console.log("Restaurante Eliminado con ID:", id);
          result(null, id);
        }
      }
    });
  }



module.exports = Restaurant;