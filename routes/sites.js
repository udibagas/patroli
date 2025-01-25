const {
  create,
  index,
  update,
  remove,
} = require("../controllers/sites.controller");
const router = require("express").Router();

router
  .post("/", create)
  .get("/", index)
  .put("/:id", update)
  .delete("/:id", remove);

module.exports = router;
