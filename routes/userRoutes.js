const usersController = require("../controllers/usersController");

const passport = require("passport");

module.exports = (app, upload) => {
  // GET -> OBTENER DATOS
  // POST -> ALMACENAR DATOS
  // PUT -> ACTUALIZAR DATOS
  // DELETE -> ELIMINAR DATOS

  app.post("/api/users/create", usersController.register);
  app.post("/api/users/createWithImage", upload.array("image", 1), usersController.registerWithImage);
  app.post("/api/users/login", usersController.login);

<<<<<<< HEAD
  //RUTAS TIPO PUT PARA ACTUALIZAR / RUTAS CON ACCESO RESTRINGIDO JSON WEB TOKEN
  app.put("/api/users/update", passport.authenticate('jwt', { session: false}), upload.array("image", 1), usersController.updateWithImage);
  app.put("/api/users/updateWithoutImage", passport.authenticate('jwt', { session: false}), usersController.updateWithoutImage);
=======
  //RUTAS TIPO PUT PARA ACTUALIZAR
  app.put("/api/users/update", upload.array("image", 1), usersController.updateWithImage);
  app.put("/api/users/updateWithoutImage", usersController.updateWithoutImage);
>>>>>>> f61697a87e0c9a92028317de3310971c04d7da2a
};
