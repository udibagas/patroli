const fs = require("fs");
const path = require("path");
const { InspectionImage } = require("../models");

exports.index = (req, res) => {
  const { directory } = req.query;

  const dirs = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(directory, dirent.name));

  const files = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => path.join(directory, dirent.name));

  const data = [...dirs, ...files].map((node) => {
    const nodes = node.split(path.sep);
    const isFile = path.extname(node) !== "";
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    return {
      label: nodes.at(-1),
      path: node,
      isFile: isFile,
      isLeaf: isFile,
      url: `${baseUrl}/${node}`,
    };
  });

  res.status(200).json(data);
};

exports.destroy = (req, res) => {
  const { checkedNodes } = req.body;

  for (const node of checkedNodes) {
    // Ensure the path is within the uploads directory
    if (!node.path.startsWith("uploads")) {
      console.error(
        `Attempt to delete file outside of uploads directory: ${node.path}`
      );
      return res.status(403).json({
        error: "Forbidden",
        message: "Cannot delete files outside of uploads directory",
      });
    }

    if (!node.isFile) {
      fs.rmdir(node.path, { recursive: true }, (err) => {
        if (err) console.error(err.message);
      });
    } else {
      fs.unlink(node.path, async (err) => {
        if (err) console.error(err.message);
        await InspectionImage.deleteByPath(node.path);
      });
    }
  }

  res.status(200).json({ message: "Data telah dihapus" });
};
