import React, { useState } from "react";
import "./navbar.css";
import { useHistory, Link } from "react-router-dom";
import lines from "../../assets/images/3lines.png";
import profile from "../../assets/images/profile.png";
import usa from "../../assets/images/usa.png";
import Sidebar from "../sidebar/sidebar";
function Navbar(props) {
  const history = useHistory();
  const [click, setclick] = useState(true)
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
const handleshowhide=()=>{
   setclick(!click);
  localStorage.setItem("navs",click)
}
  return (
      <div class="top-bar">
        <div class="topleft">
          <img src={lines} class="linesicon" onClick={handleshowhide}/>
          <p class="text03">Nepal police fleet management system</p>
        </div>
        <div class="topright">
        <i class="fa-solid fa-right-from-bracket navbar_btn fa-lg" onClick={handleLogout}></i>
          {/* <img src={logout} class="logout" onClick={handleLogout} /> */}
          <p id="name"> </p>
          <div className="dropdown-container">
              <button className="btn-image">
                {/* <img src={profile} class="profile" /> */}
                <i class="fa-solid fa-user fa-xl" ></i>
                <i class="fa-solid fa-caret-down"></i>
              </button>              
            <div className="dropdown-content" >
              <Link to ="/changepassword" className="links-in-dropdown">Change Password</Link>
            </div>
            
          </div>
          <select class="language">
            <option> En</option>
          </select>
        </div>
      </div>
  );
}

export default Navbar;
