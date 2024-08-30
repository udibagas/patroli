const {
  register,
  login,
  me,
  logout,
} = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/me", auth, me);

module.exports = router;
