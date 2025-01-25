const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/areas.controller");
const router = require("express").Router();

router
  .post("/", create)
  .get("/", index)
  .put("/:id", update)
  .delete("/:id", remove);

module.exports = router;
