const { Inspection } = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  req.body.UserId = req.user.id;

  try {
    const station = await Inspection.create(req.body);
    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const stations = await Inspection.findAll({
      order: [["updatedAt", "asc"]],
    });
    res.status(200).json(stations);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const station = await Inspection.findByPk(id);
    if (!station) throw new NotFoundError();
    res.status(200).json(station);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const station = await Inspection.findByPk(id);
    if (!station) throw new NotFoundError();
    await station.update(req.body);
    res.status(200).json(station);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const station = await Inspection.findByPk(id);
    if (!station) throw new NotFoundError();
    await station.destroy();
    res.status(200).json({ message: "Data telah dihapus" });
  } catch (error) {
    next(error);
  }
};
