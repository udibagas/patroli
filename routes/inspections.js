const { Site } = require("../models");
const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const multer = require("multer");
const { hasRole } = require("../middlewares/hasRole.middleware");
const {
  create,
  index,
  show,
  update,
  remove,
  generatePdf,
} = require("../controllers/inspections.controller");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const site = await Site.findByPk(req.user.SiteId);

    const siteName = site
      ? site.name.replace(/\s/g, "-").toLowerCase()
      : "unknown";

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const uploadPath = `uploads/${siteName}/${year}/${month}/${day}`;

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
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
