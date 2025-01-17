const route = require('express').Router();
const UserController = require('../controllers/user.controller');

route.get('/', UserController.soma);

module.exports = route;