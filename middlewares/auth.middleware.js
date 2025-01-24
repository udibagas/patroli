const { verify } = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const { User, Site } = require("../models");

exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new UnauthenticatedError();
    const [type, token] = authorization.split(" ");

    if (type.toLowerCase() !== "bearer") {
      throw new UnauthenticatedError("Invalid authentication type");
    }

    if (!token) throw new UnauthenticatedError();
    const { id } = verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(id, {
      include: Site,
    });

    if (!user) throw new UnauthenticatedError("Unregistered user");
    req.user = user;
  } catch (error) {
    return next(error);
  }

  next();
};
