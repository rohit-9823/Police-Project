import React from "react";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import success from "../../assets/images/success.png";
import { currentdate, currenttime } from "../datetime/dateTime";
import { useEffect, useState } from "react";
function Complainentry(props) {
  const [title, settitle] = useState("Complains");
  const [time, setTime] = useState(new Date());
  return (
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
        <button className="btn-details" id="btn-selected">
          Complain entry
        </button>
        <button className="btn-details">View Complain</button>
      </div>
      <form className="companydetails-form">
        <div className="company-element">
          <div className="form-elements">
            <label className="form-label">User Name</label>
            <input type="text" placeholder="Full Name" className="form-input" />
          </div>
          <div className="form-elements">
            <label className="form-label">Vehicle number</label>
            <input
              type="text"
              className="form-input"
              placeholder="BA-01-PA 5040"
            />
          </div>
        </div>
        <div className="company-element">
        <div className="form-elements">
            <label className="form-label">User type</label>
            <input
              type="text"
              className="form-input"
              placeholder="Unit/Personal"
            />
          </div>
          <div className="form-elements">
            <label className="form-label">Driver name</label>
            <input type="text" className="form-input" placeholder="Full Name" />
          </div>
        </div>
        <div className="company-element">
          
          <div className="form-elements">
            <label className="form-label">Vehicle condition</label>
            <select className="form-input">
              <option>New</option>
              <option>Old</option>
            </select>
          </div>
          <div className="form-elements">
            <label className="form-label">Vehicle condition</label>
            <select className="form-input">
              <option>New</option>
              <option>Old</option>
            </select>
          </div>
        </div>
        <div className="company-element">
          <div className="form-elements">
            <label className="form-label">User phone number</label>
            <input
              type="text"
              className="form-input"
              placeholder="98XXXXXXXX"
            />
          </div>
          
          <div className="save-cancel-col" id="save-cancel-complains">
            <button className="btn-cancel-save">Cancel</button>
            <button className="btn-cancel-save" id="save-button">
              Save
            </button>
          </div>
        </div>
      </form>
      <div className="successfully-saved">
        <img src={success} className="icon-success" />
        <span className="text06">Successfully Saved</span>
        <p className="text07">
          Vehicle detail has been saved. You can veiw the detail in{" "}
          <a>Detail View</a> section.
        </p>
      </div>
    </div>
  );
}

export default Complainentry;
