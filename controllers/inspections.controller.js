const {
  Inspection,
  InspectionImage,
  Station,
  User,
  Area,
} = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  const { id: UserId } = req.user;
  const { location, result } = req.body;

  try {
    const station = await Station.findByName(location);

    if (!station) {
      throw new NotFoundError("Station tidak ditemukan");
    }

    const inspection = await Inspection.create({
      result,
      UserId,
      StationId: station.id,
    });

    const images = req.files["images[]"] || [];

    if (images.length > 0) {
      for (const file of images) {
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
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
    const offset = (page - 1) * limit;

    const { count: total, rows } = await Inspection.findAndCountAll({
      distinct: true,
      order: [["updatedAt", "desc"]],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Station,
          attributes: ["name"],
          include: {
            model: Area,
            attributes: ["name"],
          },
        },
        {
          model: InspectionImage,
          attributes: ["path"],
        },
      ],
      limit: limit,
      offset: offset,
    });

    res.status(200).json({
      total,
      page,
      rows,
      from: offset + 1,
      to: offset + rows.length,
    });
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

exports.generatePdf = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Inspection.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Station,
          attributes: ["name", "code"],
          include: {
            model: Area,
            attributes: ["name"],
          },
        },
        {
          model: InspectionImage,
          attributes: ["path"],
        },
      ],
    });

    if (!data) throw new NotFoundError();
    console.log(data.toJSON());

    res.render("inspection", { data });

    // res.render("inspection", { data }, (err, html) => {
    //   if (err) {
    //     throw err;
    //   }

    //   res.pdfFromHTML({
    //     filename: `inspection-${id}.pdf`,
    //     htmlContent: html,
    //   });
    // });
  } catch (error) {
    next(error);
  }
};
