const { User } = require("../models");
const UnauthenticatedError = require("../errors/UnauthenticatedError");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new UnauthenticatedError();
    if (!user.verify(password)) throw new UnauthenticatedError();
    const token = user.generateToken();
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
