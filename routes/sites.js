const {
  create,
  index,
  update,
  remove,
} = require("../controllers/sites.controller");
const { hasRole } = require("../middlewares/hasRole.middleware");
const router = require("express").Router();

router
  .post("/", hasRole("superadmin"), create)
  .get("/", index)
  .put("/:id", hasRole("superadmin"), update)
  .delete("/:id", hasRole("superadmin"), remove);

module.exports = router;
