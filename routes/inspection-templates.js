const {
  create,
  index,
  update,
  remove,
} = require("../controllers/inspection-templates.controller");
const { hasRole } = require("../middlewares/hasRole.middleware");
const router = require("express").Router();

router
  .post("/", hasRole("admin", "superadmin"), create)
  .get("/", index)
  .put("/:id", hasRole("admin", "superadmin"), update)
  .delete("/:id", hasRole("admin", "superadmin"), remove);

module.exports = router;
