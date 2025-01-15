const path = require("path");
const fs = require("fs");
const {
  create,
  index,
  show,
  update,
  remove,
} = require("../controllers/inspections.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const router = require("express").Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const uploadPath = `public/uploads/${year}/${month}/${day}`;

    // Create the directory if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router
  .post("/", upload.single("file"), create)
  .get("/", index)
  .get("/:id", show)
  .put("/:id", isAdmin, update)
  .delete("/:id", isAdmin, remove);

module.exports = router;
