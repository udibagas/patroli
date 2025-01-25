const path = require("path");
const fs = require("fs");
const {
  create,
  index,
  show,
  update,
  remove,
  generatePdf,
} = require("../controllers/inspections.controller");
const router = require("express").Router();

const multer = require("multer");
const { hasRole } = require("../middlewares/hasRole.middleware");

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
    cb(null, new Date().toLocaleString("id-ID") + ext);
  },
});

const upload = multer({ storage: storage });

router
  .post("/", upload.fields([{ name: "images[]", maxCount: 10 }]), create)
  .get("/", index)
  .get("/generatePdf", generatePdf)
  .get("/:id", show)
  .put("/:id", hasRole("admin", "superadmin"), update)
  .delete("/:id", hasRole("admin", "superadmin"), remove);

module.exports = router;
