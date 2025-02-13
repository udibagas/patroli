const { Site } = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  try {
    const area = await Site.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const areas = await Site.findAll({
      order: [
        ["code", "asc"],
        ["name", "asc"],
      ],
    });
    res.status(200).json(areas);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const area = await Site.findByPk(id);
    if (!area) throw new NotFoundError();
    await area.update(req.body);
    res.status(200).json(area);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const area = await Site.findByPk(id);
    if (!area) throw new NotFoundError();
    await area.destroy();
    res.status(200).json({ message: "Data telah dihapus" });
  } catch (error) {
    next(error);
  }
};
