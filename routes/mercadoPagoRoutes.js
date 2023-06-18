const categoriesController = require("../controllers/categoriesController");
const mercadoPagoController = require("../controllers/mercadoPagoController");
const passport = require("passport");

module.exports = (app) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS

  //RUTA PARA CREAR 
  app.post("/api/payments/create", passport.authenticate('jwt', { session: false}), mercadoPagoController.createPayment);
  
  //RUTA PARA MOSTRAR 
  
};
