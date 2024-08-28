const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");

router.use(require("./auth"));
router.use(auth);
router.use("/stations", require("./stations"));

module.exports = router;
