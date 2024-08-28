const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/areas.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router
  .post("/", isAdmin, create)
  .get("/", index)
  .get("/:id", show)
  .put("/:id", isAdmin, update)
  .delete("/:id", remove);

module.exports = router;
