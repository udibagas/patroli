const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/inspections.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router
  .post("/", create)
  .get("/", index)
  .get("/:id", show)
  .put("/:id", isAdmin, update)
  .delete("/:id", isAdmin, remove);

module.exports = router;
