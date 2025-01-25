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

router.use(auth);
router.post("/logout", logout);
router.get("/me", me);

module.exports = router;
