const {
  Inspection,
  InspectionImage,
  Station,
  User,
  Shift,
} = require("../models");

const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  const { id: UserId } = req.user;
  const { location, result } = req.body;

  try {
    const station = await Station.findOne({
      where: { name: location },
    });

    if (!station) {
      throw new NotFoundError("Station tidak ditemukan");
    }

    const inspection = await Inspection.create({
      result,
      UserId,
      StationId: station.id,
    });

    if (req.files?.length > 0) {
      for (const file of req.files) {
        const { path, originalname } = file;
        await InspectionImage.create({
          path: path.split("public/")[1],
          name: originalname,
          InspectionId: inspection.id,
        });
      }
    }

    res.status(201).json(inspection);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  try {
    const inspections = await Inspection.findAll({
      order: [["updatedAt", "asc"]],
      include: [User, Station],
    });
    res.status(200).json(inspections);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const inspection = await Inspection.findByPk(id);
    if (!inspection) throw new NotFoundError();
    res.status(200).json(inspection);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const inspection = await Inspection.findByPk(id);
    if (!inspection) throw new NotFoundError();
    await inspection.update(req.body);
    res.status(200).json(inspection);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const inspection = await Inspection.findByPk(id);
    if (!inspection) throw new NotFoundError();
    await inspection.destroy();
    res.status(200).json({ message: "Data telah dihapus" });
  } catch (error) {
    next(error);
  }
};
