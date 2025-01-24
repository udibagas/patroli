const { index, destroy } = require("../controllers/captures.controller");
const { hasRole } = require("../middlewares/hasRole.middleware");

const router = require("express").Router();

router.get("/", index);
router.post("/delete", hasRole("superadmin"), destroy);

module.exports = router;
