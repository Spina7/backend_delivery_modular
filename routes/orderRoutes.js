const OrdersController = require("../controllers/ordersController");

const passport = require("passport");

module.exports = (app) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS

  //RUTA PARA CREAR UNA NUEVA CATEGORIA
  app.post("/api/orders/create", passport.authenticate('jwt', { session: false}), OrdersController.create);
  
  //RUTA PARA MOSTRAR
  app.get("/api/orders/findByStatus/:status", passport.authenticate('jwt', { session: false}), OrdersController.findByStatus);
  app.get("/api/orders/findByDeliveryAndStatus/:id_delivery/:status", passport.authenticate('jwt', { session: false}), OrdersController.findByDeliveryAndStatus);

  //RUTA PARA ACTUALIZAR STATUS DESPACHADO
  app.put("/api/orders/updateToDispatched", passport.authenticate('jwt', { session: false}), OrdersController.updateToDispatched);
  app.put("/api/orders/updateToOnTheWay", passport.authenticate('jwt', { session: false}), OrdersController.updateToOnTheWay);

};
