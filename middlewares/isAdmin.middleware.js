const ForbiddenError = require("../errors/ForbiddenError");

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ForbiddenError());
  }

  next();
};
