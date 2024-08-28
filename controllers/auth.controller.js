const { User } = require("../models");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res, next) => {
  try {
    // TODO
  } catch (error) {
    next(error);
  }
};
