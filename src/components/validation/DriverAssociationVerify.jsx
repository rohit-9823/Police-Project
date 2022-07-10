import * as Yup from "yup";;

const DriverAssociationVerify = Yup.object().shape({
  vehicleID: Yup.string().required("Vehicle ID is required."),
  computerCode: Yup.string().required("Computer Code is required."),
  // policeUnit: Yup.string().required("Police Unit is required."),
});

export default DriverAssociationVerify;
