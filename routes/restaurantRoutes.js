const restaurantController = require("../controllers/restaurantController");

const passport = require("passport");

module.exports = (app) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS

  //RUTA PARA CREAR UNA NUEVA CATEGORIA
  app.post("/api/restaurants/create", passport.authenticate('jwt', { session: false}), restaurantController.create);
  
  //RUTA PARA MOSTRAR LAS CATEGORIAS
  app.get("/api/restaurants/getAll", passport.authenticate('jwt', { session: false}), restaurantController.getAll);
};
