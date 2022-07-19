const { check } = require('express-validator');

exports.signupValidation = [
  check('name', 'Name is requied').not().isEmpty(),
  check('date', 'Date is requied').not().isEmpty(),
  check('citizenID', 'CitizenID is must be 13 characters').isLength({ min: 13 }),
  check('address', 'Address is requied').not().isEmpty(),
  check('telephone', 'Telephone must be 10 characters').isLength({ min: 10 }),
  check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password is requied').not().isEmpty(),
]

exports.loginValidation = [
  check('ID', 'CitizenID is must be 13 characters').isLength({ min: 13 }),
  check('date', 'Date is requied').not().isEmpty(),
]