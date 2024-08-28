const { create, index, show } = require("../controllers/stations.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router.post("/", isAdmin, create).get("/", index).get("/:id", show);

module.exports = router;
