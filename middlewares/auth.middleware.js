const UnauthenticatedError = require("../errors/UnauthenticatedError");

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) throw new UnauthenticatedError();
    const [type, token] = authorization.split(" ");
    if (!token) throw new UnauthenticatedError();
  } catch (error) {
    return next(error);
  }

  next();
};
