const route = require('express').Router();
const UserController = require('../controllers/user.controller');

route.post('/', UserController.create);

module.exports = route;