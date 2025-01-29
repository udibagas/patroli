const { Site } = require("../models");
const path = require("path");
const moment = require("moment");
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
      ? site.name.replace(/\s/g, "-").toUpperCase()
      : "unknown";

    const ymd = moment().format("YYYY/MM/DD");
    const uploadPath = `uploads/${siteName}/${ymd}`;
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ymdhis = moment().format("YYYYMMDDHHmmssSSS");
    const ext = path.extname(file.originalname);
    cb(null, ymdhis + ext);
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
