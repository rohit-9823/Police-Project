import Dashboard from "../components/dashboard/dashboard";
import Login from "../components/login/login";
import Role from "../components/role/role";
import User from "../components/user/user";
import Userdetailentry from "../components/userdetailsentry/userDetailEntry";
import Vehicle from "../components/vehicle/vehicle";
import Viewrole from "../components/viewrole/viewrole";
import Complainentry from "../components/complainsentry/complainEntry";
import Auth from "../pages/auth";
import Home from "./../pages/home";
import Viewuser from "../components/viewuser/viewUser";
import Updateuser from "../components/updateuser/updateUser";
import ChangePassword from "../components/changepassword/ChangePassword";
import sidebar from "../components/sidebar/sidebar";
import navbar from "../components/navbar/navbar";
import Companydetail from "../components/companyDetail/companyDetail";
import Companyview from "../components/companyDetail/companyView";
import VehicleNext from "../components/vehicle/VehicleNext";import Companytype from "../components/vehicletype/vehicletype";
import Vehicletype from "../components/vehicletype/vehicletype";
import Policeunit from "../components/policeunit/policeunit";
import Vehicleview from "../components/vehicletype/vehicleView";
import Policeview from "../components/policeunit/policeview";
import Setting from "../components/setting/setting";
import Vehicledetailview from "../components/vehicle/vehicledetailView";
import Nilami from "../components/nilami/nilami";
import Viewnilami from "../components/nilami/viewNilami";
import Report from "../components/report/report";
import DriverAssociation from "../components/driverassociation/driverassociation";
import Viewdriverassociation from "../components/driverassociation/viewDriverAssociation";

export const Routes = [
  {
    name: "login",
    component: Login,
    path: "/login",
    type: "public",
  },
  {
    name: "sidebar",
    component: sidebar,
    path: "/sidebar",
    type: "public",
  },
  {
    name: "navbar",
    component: navbar,
    path: "/navbar",
    type: "public",
  },
  {
    name: "dashboard",
    component: Dashboard,
    path: "/",
    type: "public",
  },
  {
    name: "Vehicle",
    component: Vehicle,
    path: "/vehicle",
    type: "public",
  },

  {
    name: "Nilami",
    component: Nilami,
    path: "/nilami",
    type: "public",
  },
  {
    name: "DriverAssociation",
    component: DriverAssociation,
    path: "/driverassociation",
    type: "public",
  },
  {
    name: "Report",
    component: Report,
    path: "/report",
    type: "public",
  },
  {
    name: "viewDriverAssociation",
    component: Viewdriverassociation,
    path: "/viewdriverassociation",
    type: "public",
  },
  {

    name: "VehicleNext",
    component: VehicleNext,
    path: "/vehiclenext",
    type: "public",
  },
  {
    name: "role",
    component: Role,
    path: "/role",
    type: "public",
  },
  
  {
    name: "complainsentry",
    component:Complainentry,
    path: "/complain",
    type: "public",
  },
  {
    name: "user",
    component: User,
    path: "/user",
    type: "public",
  },
  {
    name: "policeview",
    component: Policeview,
    path: "/policeview",
    type: "public",
  },
  {
    name: "updateuser",
    component: Updateuser,
    path: "/updateuser",
    type: "public",
  },
  {
    name: "userdetail",
    component: Userdetailentry,
    path: "/userdetal",
    type: "public",
  },
  {
    name: "vehicleview",
    component: Vehicleview,
    path: "/vehicleview",
    type: "public",
  },
  {
    name: "complain",
    component: Complainentry,
    path: "/complain",
    type: "public",
  },
  {
    name: "viewuser",
    component: Viewuser,
    path: "/view-user",
    type: "public",
  },
  {
    name: "companyview",
    component: Companyview,
    path: "/companyview",
    type: "public",
  },
  {
    name: "ChangePassword",
    component: ChangePassword,
    path: "/changepassword",
    type: "public",
  },
  {
    name: "Companydetail",
    component: Companydetail,
    path: "/companydetail",
    type: "public",
  },
  {
    name: "Vehicletype",
    component: Vehicletype,
    path: "/vehicletype",
    type: "public",
  },
  {
    name: "Policeunit",
    component: Policeunit,
    path: "/policeunit",
    type: "public",
  },
  {
    name: "setting",
    component: Setting,
    path: "/setting",
    type: "public",
  },
  {
    name: "vehicleview",
    component: Vehicledetailview,
    path: "/vehicledetailview",
    type: "public",
  },
  {
    name: "nilamiview",
    component: Viewnilami,
    path: "/viewnilami",
    type: "public",
  },
  
];


