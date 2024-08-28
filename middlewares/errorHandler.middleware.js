const { ValidationError } = require("sequelize");

exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  let { name: error, statusCode: status = 500, message, errors } = err;

  if (err instanceof ValidationError) {
    status = 400;
    errors = {};

    for (let e of err.errors) {
      errors[e.path] = e.message;
    }

    console.log(errors);
  }

  res.status(status).json({ error, message, errors });
};
