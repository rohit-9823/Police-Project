import React from "react";
import { Link } from "react-router-dom";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { Formik, setNestedObjectValues } from "formik";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import { Button } from "../Button-loader/Button-load";
import { httpClient } from "../../constants/httpClient";
import "./nilami.css";
import { useEffect, useState } from "react";
import { currentdate, currenttime } from "../datetime/dateTime";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import Nilamivalid from "../validation/Nilamivalid";
import Select, { createFilter } from "react-select";
function Nilami(props) {
  const [title, settitle] = useState("Nilami");
  const [time, setTime] = useState(new Date());
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [propsavailable, setpropsavailable] = useState();
  const [date, setDate] = useState();
  const [npdate, setnpDate] = useState();
  const [userdata, setuserdata] = useState([]);
  const [vehicledata, setvehicledata] = useState({
    status: "",
    description: "",
    vehicleNumberPlate: "",
    nilamidate: "",
    // nilamidates: "",
  });
  const [inputvalue, setinputvalue] = useState("");
  const [inputvalues, setinputvalues] = useState("");
  const [errmessage, seterrmessage] = useState("");
  const [rawdata, setrawdata] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    cls();
    apidata();
    fetchdatas();
  }, []);

  let cls = () => {
    if (props.history.location.state) {
      setpropsavailable(true);
      settitle("Update Nilami");
      setvehicledata({
        name: props.history.location.state.VEHICLESTATUS,
        description: props.history.location.state.DESCRIPTION,
      });
    } else {
      settitle("Nilami");
      setpropsavailable(false);
    }
  };

  const handleDate = ({ bsDate, adDate }) => {
    setDate(bsDate);
  };

  const apidata = async () => {
    await httpClient
      .GET("api/vehicle-details/get-all-noPlates", false, true)
      .then((res) => setrawdata(res.data.data));
  };

  const handleerr = (e) => {
    if (selectedOption != "") {
      console.log("not empty");
    } else {
      e.preventDefault();
      console.log("emoty");
    }
  };
  const fetchdatas = async () => {
    return await httpClient
      .GET("api/vehicle-details/get-all/0/20", false, true)
      .then((res) => {
        const result = res.data.data.content;
        return result;
      });
  };

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
        <Link to="../nilami">
          <button className="btn-details" id="btn-selected">
            Nilami Details
          </button>
        </Link>

        <Link to="../viewnilami">
          <button className="btn-details">Nilami View</button>
        </Link>
      </div>
      <Formik
        enableReinitialize
        initialValues={vehicledata}
        validationSchema={Nilamivalid}
        onSubmit={async (values) => {
          setIsButtonLoading(true);
          let createUser = "";
          if (propsavailable) {
            createUser = {
              vehicleStatus: values.status,
              description: values.description,
              ID: props.history.location.state.ID,
            };
          } else {
            createUser = {
              noPlate: values.vehicleNumberPlate,
              vehicleStatus: values.status,
              description: values.description,
              nilamiDate: values.nilamidate,
              npNilamiDate: date,
            };
          }

          httpClient
            .POST(
              "api/vehicle-nilami/create",
              createUser,
              false,
              true,
              "createUser"
            )
            .then((res) => {
              setTimeout(() => {
                setIsButtonLoading(false);  
              }, 1000);
              
              toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
              props.history.push('/viewnilami')
            })
            .catch((err) => {
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });
            });
        }}
      >
        {({ errors, touched, setFieldValue, setFieldTouched }) => (
          //   {/* Form started */}
          <Form className="companydetails-form">
            <div className="company-element">
              <div className="form-elements">
                <label className="form-label">Vehicle Number Plate</label>

                <Select
                  // defaultValue={selectedOption}
                  // onChange={setSelectedOption}
                  options={rawdata}
                  name="vehicleNumberPlate"
                  onChange={(option) => (
                    setSelectedOption,
                    setFieldValue("vehicleNumberPlate", option.value)
                  )}
                />
                {errors.vehicleNumberPlate && touched.vehicleNumberPlate ? (
                  <div className="error-message">
                    {errors.vehicleNumberPlate}
                  </div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Vehicle Status</label>
                <Field
                  as="select"
                  placeholder="Vehicle Status"
                  name="status"
                  class="form-input"
                >
                  <option value="" style={{ display: "none" }}>
                    {vehicledata.name}
                  </option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Field>
                {errors.status && touched.status ? (
                  <div className="error-message">{errors.status}</div>
                ) : null}
              </div>
            </div>
            <div className="company-element">
              {propsavailable ? null : (
                <div className="form-elements">
                  <label className="form-label">Nilami Date</label>
                  <Field
                    class="form-input"
                    name="nilamidate"
                    autocomplete="off"
                    type="date"
                    formControlName="nilamidate"
                  />
                  {errors.nilamidate && touched.nilamidate ? (
                    <div className="error-message">{errors.nilamidate}</div>
                  ) : null}
                </div>
              )}

              {propsavailable ? null : (
                <div className="form-elements">
                  <label className="form-label">NP Nilami Date</label>
                  <Calendar
                    onChange={handleDate}
                    value={date}
                    // name="nilamidates"
                    class="form-input"
                  />
                  {/* {errors.nilamidates && touched.nilamidates ? (
                    <div className="error-message">{errors.nilamidates}</div>
                  ) : null} */}
                </div>
              )}
            </div>
            <div className="company-element">
              <div className="form-elements">
                <label className="form-label">Description</label>

                <Field
                  component="textarea"
                  rows="4"
                  name="description"
                  class="form-input"
                  placeholder="Description"
                ></Field>
                {errors.description && touched.description ? (
                  <div className="error-message">{errors.description}</div>
                ) : null}
              </div>

              <div className="vehform-save-cancel-col responsive-save-cancel">
                <Button
                  disabled={Object.values(errors).length > 0 ? true : false}
                  // onClick={(e) => {
                  //   setIsButtonLoading(true);
                  //   setTimeout(() => {
                  //     setIsButtonLoading(false);
                  //   }, 1000);
                  // }}
                  isLoading={isButtonLoading}
                  type="submit"
                  className="btn btn-danger btn-cancel-save-nilami"
                  id="save-button"
                >
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Nilami;
