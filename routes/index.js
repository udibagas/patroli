const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");
const { hasRole } = require("../middlewares/hasRole.middleware");

router.use(require("./auth"));
router.use(auth);

// data inspection bisa dilihat oleh semua role
router.use("/inspections", require("./inspections"));

// site di maintain oleh superadmin
router.use("/sites", hasRole("superadmin"), require("./sites"));

// cuma bisa diakses oleh admin & superadmin
router.use(hasRole("admin", "superadmin"));
router.use("/stations", require("./stations"));
router.use("/users", require("./users"));
router.use("/areas", require("./areas"));
router.use("/shifts", require("./shifts"));
router.use("/inspection-templates", require("./inspection-templates"));
router.use("/captures", require("./captures"));

module.exports = router;
