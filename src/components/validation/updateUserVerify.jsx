import * as Yup from 'yup';

const updateUserVerify = Yup.object().shape({
    username: Yup.string()
    .email('Must be a valid username')
    .required(' Username is required.'),
    firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed ")
      .required("First Name is required."),
    lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' FirstName is required.'),
    middleName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    rank: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' Rank is required.'),
    gender: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' Gender is required.'),
    computerCode: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' Computer Code is required.'),
});

export default updateUserVerify;

  