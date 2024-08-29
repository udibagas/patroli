const { User } = require("../models");
const UnauthenticatedError = require("../errors/UnauthenticatedError");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new UnauthenticatedError("Username atau password salah");
    if (!user.verify(password)) {
      throw new UnauthenticatedError("Username atau password salah");
    }
    const token = user.generateToken();
    res.status(200).cookie("token", token).json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res) => {
  res.status(200).json(req.user);
};
