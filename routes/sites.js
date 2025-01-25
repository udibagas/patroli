const { create, update, remove } = require("../controllers/sites.controller");
const router = require("express").Router();

router.post("/", create).put("/:id", update).delete("/:id", remove);

module.exports = router;
