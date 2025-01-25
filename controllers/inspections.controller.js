const {
  Inspection,
  InspectionImage,
  Station,
  User,
  Area,
  Shift,
} = require("../models");
const NotFoundError = require("../errors/NotfoundError");
const moment = require("moment");

exports.create = async (req, res, next) => {
  const { id: UserId, SiteId } = req.user;
  const { location, result } = req.body;

  try {
    const station = await Station.findByName(location, SiteId);

    if (!station) {
      throw new NotFoundError("Station tidak ditemukan");
    }

    const inspection = await Inspection.create({
      result,
      UserId,
      SiteId,
      StationId: station.id,
    });

    const images = req.files["images[]"] || [];

    if (images.length > 0) {
      for (const file of images) {
        const { path, originalname } = file;
        await InspectionImage.create({
          SiteId,
          InspectionId: inspection.id,
          path: path.split("public/")[1], // kalau windows harus disesuaikan
          name: originalname,
        });
      }
    }

    res.status(201).json(inspection);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const offset = (page - 1) * limit;
  const { SiteId } = req.user;

  const options = {
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
  };

  if (SiteId) {
    options.where = { SiteId };
  }

  try {
    const { count: total, rows } = await Inspection.findAndCountAll(options);

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
  const { shift, date: reportDate = moment().format("YYYY-MM-DD") } = req.query;
  const { SiteId } = req.user;

  if (!shift || !reportDate) {
    return res.status(400).json({
      message: "Data tidak lengkap",
    });
  }

  const shiftDetail = await Shift.findByName(shift);

  if (!shiftDetail) {
    return res.status(400).json({ message: "Shift tidak ditemukan" });
  }

  if (!moment(reportDate, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).json({ message: "Tanggal tidak valid" });
  }

  const shiftStart = await shiftDetail.getEarlyStart();
  const shiftEnd = await shiftDetail.getLateEnd();

  try {
    const data = await Inspection.report({ SiteId, shift, reportDate });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const payload = {
      baseUrl,
      data,
      reportDate,
      shiftDetail,
      shiftStart,
      shiftEnd,
    };

    // res.render("inspection", payload);

    res.render("inspection", payload, (err, html) => {
      if (err) throw err;

      res.pdfFromHTML({
        filename: `laporan-patroli-${reportDate}-${shift.name}.pdf`,
        htmlContent: html,
        options: {
          format: "A4",
          orientation: "portrait",
          border: {
            top: "20mm",
            right: "12mm",
            bottom: "20mm",
            left: "12mm",
          },
        },
      });
    });
  } catch (error) {
    next(error);
  }
};
