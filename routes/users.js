const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/users.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router
  .post("/", isAdmin, create)
  .get("/", isAdmin, index)
  .get("/:id", show)
  .put("/:id", isAdmin, update)
  .delete("/:id", isAdmin, remove);

module.exports = router;
