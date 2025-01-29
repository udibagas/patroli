const { User, Site } = require("../models");
const UnauthenticatedError = require("../errors/UnauthenticatedError");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.generateToken();
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({
      where: { name },
      attributes: { include: ["password"] },
      include: Site,
    });

    if (!user) throw new UnauthenticatedError("Username atau password salah");
    if (!user.verify(password)) {
      throw new UnauthenticatedError("Username atau password salah");
    }
    const token = user.generateToken();
    res.cookie("token", token, { httpOnly: true });
    res.status(200).cookie("token", token).json({ token, user });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "See you!" });
};

exports.me = async (req, res) => {
  res.status(200).json(req.user);
};
