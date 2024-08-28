const { create } = require("../controllers/stations.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router.post("/", isAdmin, create);

module.exports = router;
