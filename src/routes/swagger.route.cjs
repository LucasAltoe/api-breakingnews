const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(swaggerDocument));

module.exports = router;

//Acessar via http://localhost:3000/doc