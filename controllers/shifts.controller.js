const { Shift } = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  try {
    const area = await Shift.create(req.body);
    res.status(201).json(area);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const areas = await Shift.findAll({ order: [["name", "asc"]] });
    res.status(200).json(areas);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const area = await Shift.findByPk(id);
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
    const area = await Shift.findByPk(id);
    if (!area) throw new NotFoundError();
    await area.destroy();
    res.status(200).json({ message: "Data telah dihapus" });
  } catch (error) {
    next(error);
  }
};