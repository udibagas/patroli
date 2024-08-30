const { Station } = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  try {
    const station = await Station.create(req.body);
    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const stations = await Station.findAll({ order: [["code", "asc"]] });
    res.status(200).json(stations);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const station = await Station.findByPk(id);
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
    const station = await Station.findByPk(id);
    if (!station) throw new NotFoundError();
    await station.destroy();
    res.status(200).json({ message: "Data telah dihapus" });
  } catch (error) {
    next(error);
  }
};
