const router = require("express").Router();
const {
  index: getInspectionTemplates,
} = require("../controllers/inspection-templates.controller");
const { index: getShifts } = require("../controllers/shifts.controller");
const { index: getSites } = require("../controllers/sites.controller");
const { auth } = require("../middlewares/auth.middleware");
const { hasRole } = require("../middlewares/hasRole.middleware");

router.use(require("./auth"));
router.use(auth);

// data inspection bisa dilihat oleh semua role
router.use("/inspections", require("./inspections"));
router.get("/shifts", getShifts);
router.get("inspection-templates", getInspectionTemplates);
router.get("/sites", getSites);

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
