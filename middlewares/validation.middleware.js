const validator = require("validator");

exports.validate = (req, res, next) => {
  const { email, password } = req.body;
  try {
    validator.isEmail(email);
  } catch (error) {
    return next(error);
  }

  next();
};
