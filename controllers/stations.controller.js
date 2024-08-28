const { Station } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const station = await Station.create(req.body);
    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};
