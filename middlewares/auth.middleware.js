const { verify } = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const { User } = require("../models");

exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new UnauthenticatedError();
    const [type, token] = authorization.split(" ");

    if (type.toLowerCase() !== "bearer") {
      throw new UnauthenticatedError("Invalid authentication type");
    }

    if (!token) throw new UnauthenticatedError();
    const { email } = verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email } });
    if (!user) throw new UnauthenticatedError("Unregistered user");
    req.user = user;
  } catch (error) {
    return next(error);
  }

  next();
};
