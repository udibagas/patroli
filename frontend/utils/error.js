export const parseError = (e) => {
  const errors = {};

  if (e.response?.status == 400) {
    e.response._data.errors.forEach(({ error, property }) => {
      errors[property] = error;
    });
  }

  return errors;
};
