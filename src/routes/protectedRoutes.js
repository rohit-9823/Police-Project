import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Route } from "react-router";
import Dashboard from "../components/dashboard/dashboard";  
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import "./routing.css";
import { httpClient } from "../constants/httpClient";
import { SettingsApplicationsRounded } from "@material-ui/icons";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [cart, setcart] = useState(true);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
    console.log("clickef");
  };

  console.log("inside protected route");
  const expiry_time = localStorage.getItem("timeout");
  console.log(expiry_time);
  setTimeout(() => {
    localStorage.removeItem("access-token");
    const refresh_token = localStorage.getItem("refresh_token");
    const data = {};
    data.refresh_token = refresh_token;
    if (refresh_token) {
      httpClient
        .UPLOAD("POST", "oauth/token", data, "refresh_token", null)
        .then((resp) => {
          let response = JSON.parse(resp);
          localStorage.setItem("dm-access_token", response.access_token);
          localStorage.setItem("dm-refresh_token", response.refresh_token);
          localStorage.setItem("timeout", response.expires_in);
          localStorage.setItem("status", response.status);
        })
        .catch((err) => {
          // notify.error(err);
        });
    } else {
      <Redirect
        to={{
          pathname: "/login",
          timeoutMsg: "session expired please Login again",
        }}
      ></Redirect>;
    }
  }, expiry_time);

useEffect(() => {
  window.addEventListener('storage',()=>{
    setcart((localStorage.getItem('navs')))
  })  
}, [])

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return localStorage.getItem("Logindata") ? (
          <div className="wholepage">
            <Sidebar isOpen={sidebarOpen}/>
            {/* <Menu/> */}
            <div className="rightside">
              <Navbar onClick={handleViewSidebar} />
              <Component {...routeProps}></Component>
            </div>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              timeoutMsg: "session expired please Login again",
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
};
export default ProtectedRoute;
