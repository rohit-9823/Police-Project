import * as Yup from 'yup';

const userVerify = Yup.object().shape({
    username: Yup.string()
    .email('Must be a valid username')
    .required(' Username is required.'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password length should be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters. Use uppercase, lowercase, number and special character"
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must and should match'),
    mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Mobile number must be exactly 10 digits')
    .max(10, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' FirstName is required.'),
    lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' LastName is required.'),
    middleName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    roleId: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(3, 'Must be less than 3 digits')
    .required(' Role Id is required.'),
});

export default userVerify;
