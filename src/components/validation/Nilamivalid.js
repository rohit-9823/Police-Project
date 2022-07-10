import * as Yup from "yup";

const Nilamivalid = Yup.object().shape({
    status: Yup.string()
    .required("Status is required."),
description: Yup.string()
.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed.")
.required("Description is required."),
vehicleNumberPlate:Yup.string()
.required("Vehicle Number Plate is required."),
nilamidate:Yup.string()
.required("Date is required."),
// nilamidates:Yup.string()
// .required("Np Date is required."),
});

export default Nilamivalid;
