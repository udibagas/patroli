const ForbiddenError = require("../errors/ForbiddenError");

module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ForbiddenError());
  }

  next();
};
