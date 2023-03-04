const addressController = require("../controllers/addressController");

const passport = require("passport");

module.exports = (app) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS

  //RUTA PARA CREAR UNA NUEVA DIRECCION
  app.post("/api/address/create", passport.authenticate('jwt', { session: false}), addressController.create);
  
  //RUTA PARA MOSTRAR 
  app.get("/api/address/findByUser/:id_user", passport.authenticate('jwt', { session: false}), addressController.findByUser);
};
