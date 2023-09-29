const db = require("../config/config");
const bcrypt = require("bcryptjs");

const User = {};

User.findById = (id, result) => {
  const sql = `
  SELECT
      CONVERT(U.id, char) AS id,
      U.email, 
      U.name,
      U.lastname,
      U.image,
      U.phone,
      U.password,
      U.notification_token,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', CONVERT(R.id, char),
          'name', R.name,
          'image', R.image,
          'route', R.route
        )
      ) AS roles
    FROM
      users AS U
    INNER JOIN 
      user_has_roles AS UHR
    ON 
      UHR.id_user = U.id
    INNER JOIN 
      roles AS R
    ON 
      UHR.id_rol = R.id
    WHERE
      U.id = ?
    GROUP BY 
      U.id
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
};

User.findByEmail = (email, result) => {
  const sql = `
    SELECT
      U.id,
      U.email, 
      U.name,
      U.lastname,
      U.image,
      U.phone,
      U.password,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', CONVERT(R.id, char),  
          'name', R.name,
          'image', R.image,
          'route', R.route
            )
        ) AS roles
    FROM
      users AS U
    INNER JOIN 
      user_has_roles AS UHR
    ON 
      UHR.id_user = U.id
    INNER JOIN 
      roles AS R
    ON 
      UHR.id_rol = R.id
    WHERE
      email = ?
    GROUP BY 
      U.id
  `;

  db.query(sql, [email], (err, user) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      console.log("Usuario obtenido:", user[0]);
      result(null, user[0]);
    }
  });
};

User.create = async (user, result) => {
  const hash = await bcrypt.hash(user.password, 10);

  const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      user.email,
      user.name,
      user.lastname,
      user.phone,
      user.image,
      hash,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Id del nuevo usuario:", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

//ACTUALIZAR DATOS CASO 1 (Nombre, Apellido, Telefono, Imagen)
User.update = async (user, result) => {

  // Check if password is provided in the update payload
  let hash;
  if (user.password) {
    hash = await bcrypt.hash(user.password, 10);
  }

  let sql, parameters;

  // If password is provided, then include it in the update statement
  if (hash) {
    sql = `
      UPDATE
        users
      SET
        name = ?,
        lastname = ?,
        phone = ?,
        image = ?,
        password = ?,
        updated_at = ?
      WHERE
        id = ? 
    `;

    parameters = [
      user.name,
      user.lastname,
      user.phone,
      user.image,
      hash,
      new Date(),
      user.id
    ];
  } else {
    // If no password is provided, then don't include it in the update statement
    sql = `
      UPDATE
        users
      SET
        name = ?,
        lastname = ?,
        phone = ?,
        image = ?,
        updated_at = ?
      WHERE
        id = ? 
    `;

    parameters = [
      user.name,
      user.lastname,
      user.phone,
      user.image,
      new Date(),
      user.id
    ];
  }

  db.query(
    sql,
    parameters,
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Usuario Actualizado", user.id);
        result(null, user.id);
      }
    }
  );
}


//ACTUALIZAR DATOS CASO 2 (Nombre, Apellido, Telefono)
User.updateWithoutImage = (user, result) => {

  const sql = `
    UPDATE
      users
    SET
      name = ?,
      lastname = ?,
      phone = ?,
      updated_at = ?
    WHERE
      id  = ? 
  `;

  db.query(
    sql,
    [
      user.name,
      user.lastname,
      user.phone,
      new Date(),
      user.id
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        console.log("Usuario Actualizado", user.id);
        result(null, user.id);
      }
    }
  );

}

User.findDeliveryMen = (result) => {
  
  const sql = `
    SELECT
      CONVERT(U.id, char) AS id,
	    U.email, 
	    U.name,
	    U.lastname,
	    U.image,
	    U.phone
    FROM
	    users AS U
    INNER JOIN 
	    user_has_roles UHR
    ON
	    UHR.id_user = U.id
    INNER JOIN 
	    roles AS R
    ON 
	    R.id = UHR.id_rol
    WHERE
	    R.id = 2;
  `;

  db.query(
    sql,
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        result(null, data);
      }
    }
  );
}

User.findAdmins = (result) => {
  
  const sql = `
    SELECT 
	    CONVERT(U.id, char) AS id,
      U.name,
      U.notification_token
    FROM
	    users AS U
    INNER JOIN
	    user_has_roles AS UHR
    ON 
	    UHR.id_user = U.id
    INNER JOIN
	    roles AS R
    ON 
	    R.id = UHR.id_rol
    WHERE
	    R.id = 1
  `;

  db.query(
    sql,
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        result(null, data);
      }
    }
  );
}

User.updateNotificationToken = (id, token, result) => {

  const sql = `
    UPDATE
      users
    SET
      notification_token = ?,
      updated_at = ?
    WHERE
      id  = ? 
  `;

  db.query(
    sql,
    [
      token,
      new Date(),
      id
    ],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(err, null);
      } else {
        result(null, id);
      }
    }
  );

}

User.findAll = (result) => {
  
  const sql = `
    SELECT
      CONVERT(U.id, char) AS id,
      U.email, 
      U.name,
      U.lastname,
      U.image,
      U.phone,
      U.notification_token,
      U.created_at,
      U.updated_at,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', CONVERT(R.id, char),
          'name', R.name,
          'image', R.image,
          'route', R.route
        )
      ) AS roles
    FROM
      users AS U
    LEFT JOIN 
      user_has_roles AS UHR
    ON 
      UHR.id_user = U.id
    LEFT JOIN 
      roles AS R
    ON 
      UHR.id_rol = R.id
    GROUP BY 
      U.id
    ORDER BY 
      U.name ASC
  `;

  db.query(sql, (err, users) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
    } else {
      console.log("Users obtained:", users);
      result(null, users);
    }
  });
};

User.delete = (id, result) => {
  const sql = `
    DELETE FROM
      users
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
        console.log("Usuario Eliminado con ID:", id);
        result(null, id);
      }
    }
  });
}




module.exports = User;
