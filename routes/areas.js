const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/areas.controller");
const { hasRole } = require("../middlewares/hasRole.middleware");
const router = require("express").Router();

router
  .post("/", hasRole("admin", "superadmin"), create)
  .get("/", index)
  .put("/:id", hasRole("admin", "superadmin"), update)
  .delete("/:id", hasRole("admin", "superadmin"), remove);

module.exports = router;
