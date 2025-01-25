const { create, update, remove } = require("../controllers/shifts.controller");
const router = require("express").Router();

router.post("/", create).put("/:id", update).delete("/:id", remove);

module.exports = router;
