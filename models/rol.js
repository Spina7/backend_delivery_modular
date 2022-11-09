//rol.js NOS AYUDARA A GENERAR LOS ROLES DE CADA UNO DE LOS USUARIOS

//REQUERIR LA BASE DE DATOS
const db = require('../config/config');

const Rol = {};

//CREAR UN NUEVO ROL
Rol.create = (id_user, id_rol, result) => {
    const sql = `
        INSERT INTO
            user_has_roles(
                id_user,
                id_rol,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?)
    `;

    db.query(   //SQL ES LA INSERCION DE DATOS 
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) =>{      //POR SI HUBO UN ERROR
            if(err){
                console.log('Error: ', err);
                result(err, null);
            }
            else{
                console.log('Usuario Obtenido: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

module.exports = Rol; //EXPORTAR LOS "ROLES" A OTRAS PARTES DEL CODIGO