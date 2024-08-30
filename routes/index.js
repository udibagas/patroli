const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");

router.use(require("./auth"));
router.use(auth);
router.use("/stations", require("./stations"));
router.use("/users", require("./users"));
router.use("/areas", require("./areas"));
router.use("/shifts", require("./shifts"));
router.use("/inspection-templates", require("./inspection-templates"));
router.use("/inspections", require("./inspections"));

module.exports = router;
