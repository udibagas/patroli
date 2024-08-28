const { create } = require("../controllers/stations.controller");
const router = require("express").Router();

router.post("/", create);

module.exports = router;
