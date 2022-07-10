import * as Yup from 'yup';

const VehicleDetails = Yup.object().shape({
  
  vehicleNoPlate: Yup.string()
  .required("Number Plate is required."),
  model: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed")
    .required('Model is required.'),
    vehicletype: Yup.string()
    .required(' Vehicle type is required.'),
    companyName: Yup.string()
    .required(' Company Name is required.'),
    sizes: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required(' Size is required.'),
    estimatedLifeTime: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required(' Life Time is required.'),
    cylinder: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required(' Cylinder is required.'),
    seat: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required(' Seat is required.'),
    engineNo: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required(' Engine No is required.'),
    chassisNo: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required('Chassis No is required.'),
    horsePower: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required('Horsepower No is required.'),
    // npDate: Yup.string()
    // .required('Date No is required.'),
});

export default VehicleDetails