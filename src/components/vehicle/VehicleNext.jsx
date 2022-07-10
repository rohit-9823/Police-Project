import React from "react";
import { Link } from "react-router-dom";
// import { Formik } from "formik";
// import { Form, Field } from "formik";
import logoicon from "../../assets/images/logonew.png";
import dashboardicon from "../../assets/images/dashboard.png";
import lines from "../../assets/images/3lines.png";
import books from "../../assets/images/book.png";
import logout from "../../assets/images/ci_log-out.png";
import contact from "../../assets/images/contacts.png";
import ticket from "../../assets/images/tickets.png";
import settingicon from "../../assets/images/settings.png";
import profile from "../../assets/images/profile.png";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import success from "../../assets/images/success.png";
import Dashboard from "../dashboard/dashboard";
import "./vehicle.css";
import { useEffect, useState } from "react";
import { currentdate, currenttime } from "../datetime/dateTime";
function VehicleNext(props) {
  const [title, settitle] = useState("Vehicle Details");
  const [time, setTime] = useState(new Date());
  return (
    // <div class="page">

    //   <div class="container" >

    <div className="details">
      <div className="heading_line">
        <p className="text04">{title}</p>
        <div className="datetime">
          <img src={calendericon} className="datetime-logo" />
          <span className="text05">{currentdate}</span>
          <img src={timeicon} className="datetime-logo" />
          <span className="text05">
            {time.toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </div>
      <div className="buttons-line">
        <Link to="../vehicle">
          <button className="btn-details" id="btn-selected">
            Vehicle Entry
          </button>
        </Link>
        <button className="btn-details">View Vehicle</button>
      </div>
      <form className="vehicle-form">
        <div className="veh-form">
          <div className="form-elements">
            <label className="form-label">Vehicle Size</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
          <div className="form-elements">
            <label className="form-label">Estimated Age</label>
            <input type="text" className="form-input" placeholder="x" />
          </div>
          <div className="form-elements">
            <label className="form-label">Source of Purchase</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
        </div>
        <div className="veh-form">
          <div className="form-elements">
            <label className="form-label">Proof of Income</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
          <div className="form-elements">
            <label className="form-label">Each Unit Cost</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
          <div className="form-elements">
            <label className="form-label">Total Cost</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
        </div>
        <div className="veh-form">
          <div className="form-elements">
            <label className="form-label">Proof of Expenses</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
          <div className="form-elements">
            <label className="form-label">Total Cost</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
        </div>
        <div className="veh-form">
          <div className="form-elements">
            <label className="form-label">Proof of Outstanding</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
          <div className="form-elements">
            <label className="form-label">Total Cost</label>
            <input type="text" className="form-input" placeholder="xxx" />
          </div>
          <div className="vehform-save-cancel-col responsive-save-cancel">
            <Link to="./vehicle">
              <button className="veh-btn-cancel-save">Back</button>
            </Link>

            <button className="veh-btn-cancel-save" id="save-button">
              Save
            </button>
            <button className="veh-btn-cancel-save">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    /* </div>
    </div> */
  );
}

export default VehicleNext;
