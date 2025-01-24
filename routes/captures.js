const { index, destroy } = require("../controllers/captures.controller");

const router = require("express").Router();

router.get("/", index);
router.post("/delete", destroy);

module.exports = router;
