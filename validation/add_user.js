const Validator = require('validator'),
  isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
//   avoid null  error
  data.email = !isEmpty(data.email) ? data.email : '';
  data.age = !isEmpty(data.age) ? data.age : '';
  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = 'Age field is required';
  }
//   ,{allow_leading_zeroes: false}
  if (Validator.isInt(data.age)) {
    errors.age = 'Age field is not valid';
  }
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'Firstname field is required';
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Lastname field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
