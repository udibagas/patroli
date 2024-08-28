const {
  create,
  index,
  update,
  remove,
} = require("../controllers/shifts.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

router
  .post("/", isAdmin, create)
  .get("/", index)
  .put("/:id", isAdmin, update)
  .delete("/:id", isAdmin, remove);

module.exports = router;
