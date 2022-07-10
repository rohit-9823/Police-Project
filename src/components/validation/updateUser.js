import * as Yup from 'yup';

const updateUser = Yup.object().shape({
    username: Yup.string()
    .email('Must be a valid username')
    .required(' Username is required.'),
    firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' FirstName is required.'),
    lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' FirstName is required.'),
    middleName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' FirstName is required.'),
    name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' FirstName is required.'),
    rank: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' Rank is required.'),
    gender: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required(' Gender is required.'),
    computercode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(3, 'Must be less than 3 digits')
    .required(' Computer Code is required.'),
});

export default updateUser;
