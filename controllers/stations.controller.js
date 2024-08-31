const { Station, Area, sequelize } = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  try {
    const station = await sequelize.transaction(async (t) => {
      const station = await Station.create(req.body, { transaction: t });
      await Area.bulkCreate(
        req.body.Areas.map(({ name }) => ({ StationId: station.id, name })),
        { transaction: t }
      );

      return station;
    });

    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const stations = await Station.findAll({
      include: Area,
      order: [["code", "asc"]],
    });
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
    await sequelize.transaction(async (t) => {
      await Area.destroy({ where: { StationId: id }, transaction: t });
      await station.update(req.body, { transaction: t });
      const areas = req.body.Areas.map(({ name }) => ({
        StationId: station.id,
        name,
      }));
      await Area.bulkCreate(areas, { transaction: t });
    });

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
