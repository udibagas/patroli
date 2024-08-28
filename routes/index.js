const router = require("express").Router();

router.use(require("./auth"));
router.use("/stations", require("./stations"));

module.exports = router;
