const route = require('express').Router();
const UserController = require('../controllers/user.controller');
const {validId, validUser} = require('../middlewares/global.middlewares');

route.post("/", UserController.create);

route.get("/", UserController.findAll);

route.get("/:id", validId, validUser, UserController.findById);

route.patch("/:id",validId, validUser, UserController.update)

module.exports = route;