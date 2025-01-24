const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/stations.controller");
const { hasRole } = require("../middlewares/hasRole.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router
  .post("/", hasRole("admin", "superadmin"), create)
  .get("/", index)
  .put("/:id", hasRole("admin", "superadmin"), update)
  .delete("/:id", hasRole("admin", "superadmin"), remove);

module.exports = router;
