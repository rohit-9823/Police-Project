import * as Yup from 'yup';

const Companydetailvalid = Yup.object().shape({
    name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed ")
    .required("Name is required."),
description: Yup.string()
.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed ")
.required("Description is required."),

});

export default Companydetailvalid;
