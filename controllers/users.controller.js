const { User, Site } = require("../models");
const NotFoundError = require("../errors/NotfoundError");

exports.create = async (req, res, next) => {
  let { SiteId } = req.body; // set by superadmin

  if (req.user.role === "admin") {
    SiteId = req.user.SiteId;
  }

  console.log(req.user);

  try {
    const user = await User.create({ ...req.body, SiteId });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.index = async (req, res, next) => {
  const options = {
    order: [["name", "asc"]],
    include: Site,
  };

  // admin cuma bisa lihat user di site-nya aja
  if (req.user.role === "admin") {
    options.where = {
      SiteId: req.user.SiteId,
    };
  }

  try {
    const users = await User.findAll(options);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { SiteId } = req.user;
  const options = {};

  if (SiteId) {
    options.where = { SiteId };
  }

  try {
    const user = await User.findByPk(id, options);
    if (!user) throw new NotFoundError();
    await user.update(req.body);
    await user.reload();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  const options = {};

  if (req.user.role === "admin") {
    options.where = {
      SiteId: req.user.SiteId,
    };
  }

  try {
    const user = await User.findByPk(id, options);
    if (!user) throw new NotFoundError();
    await user.destroy();
    res.status(200).json({ message: "Data telah dihapus" });
  } catch (error) {
    next(error);
  }
};
