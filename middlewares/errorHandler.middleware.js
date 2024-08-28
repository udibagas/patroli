const { ValidationError } = require("sequelize");

exports.errorHandler = (err, req, res, next) => {
  let { name: error, statusCode: status = 500, message, errors } = err;

  if (err instanceof ValidationError) {
    status = 400;
    errors = {};

    for (let e of err.errors) {
      errors[e.path] = e.message;
    }

    // console.log(errors);
  }

  if (status == 500) {
    console.log(err);
  }

  res.status(status).json({ error, message, errors });
};
