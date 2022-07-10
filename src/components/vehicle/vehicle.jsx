import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { Button } from "../Button-loader/Button-load";
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import "./vehicle.css";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate, currenttime } from "../datetime/dateTime";
import VehicleDetails from "../validation/VehicleDetails";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
// import VehicleDetailValid from "../validation/VehicleDetailValid";

function Vehicle(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [title, settitle] = useState("Vehicle Details");
  const [companytypes, setcompanytypes] = useState([]);
  const [time, setTime] = useState(new Date());
  const [userdata, setuserdata] = useState([]);
  const [npdate, setnpDate] = useState('');
  const [entrydate, setDate] = useState();
  const [propsavailable, setpropsavailable] = useState();
  const [updatedata, setupdatedata] = useState({
    vehicleNoPlate: "",
    model: "",
    vehicletype: "",
    companyName: "",
    sizes: "",
    estimatedLifeTime: "",
    cylinder: "",
    seat: "",
    engineNo: "",
    chassisNo: "",
    horsePower: "",
    // npDate: "",
    COMPANYID: "",
    EntryDate: "",
    VEHICLETYPEID: "",
  });

  const handleDate = ({ bsDate, adDate }) => {
    setnpDate(bsDate);
  };
  const entryhandleDate = ({ bsDate, adDate }) => {
    setDate(bsDate);
  };

  const vehicledata = async () => {
    httpClient
      .GET("api/vehicle/get-all", false, true)
      .then((resp) => {
        setuserdata(resp.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const companydatas = async () => {
    httpClient
      .GET("api/company/get-all", false, true)
      .then((resp) => {
        setcompanytypes(resp.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  let cls = () => {
    if (props.history.location.state) {
      setpropsavailable(true);
      setnpDate(props.history.location.state.NPDATE);
      setDate(props.history.location.state.ENTRYDATE);
      setupdatedata({
        vehicleNoPlate: props.history.location.state.VEHICLENOPLATE,
        model: props.history.location.state.MODEL,
        vehicleTypesId: props.history.location.state.VEHICLETYPEID,
        vehicletype: props.history.location.state.VEHICLETYPENAME,
        companyName: props.history.location.state.COMPANYNAME,
        sizes: props.history.location.state.SIZES,
        estimatedLifeTime: props.history.location.state.ESTIMATEDLIFETIME,
        cylinder: props.history.location.state.CYLINDER,
        seat: props.history.location.state.SEATNO,
        engineNo: props.history.location.state.ENGINENO,
        chassisNo: props.history.location.state.CHASSISNO,
        horsePower: props.history.location.state.HORSEPOWER,
        npDate: props.history.location.state.NPDATE,
        COMPANYID: props.history.location.state.COMPANYID,
      });
    } else {
      setpropsavailable(false);
    }
  };

  useEffect(() => {
    console.log(props);
    vehicledata();
    companydatas();
    cls();
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
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
          Vehicle Entry
        </button>
        <Link to="../vehicledetailview">
          <button className="btn-details">View Vehicle</button>
        </Link>
      </div>

      <Formik
        enableReinitialize
        initialValues={updatedata}
        validationSchema={VehicleDetails}
        onSubmit={async (values) => {
          let createUser = "";
setIsButtonLoading(true)
          if (propsavailable) {
            createUser = {
              vehicleNoPlate: values.vehicleNoPlate,
              model: values.model,
              vehicleTypesId: props.history.location.state.VEHICLETYPEID,
              companyId: values.COMPANYID,
              sizes: values.sizes,
              estimatedLifeTime: values.estimatedLifeTime,
              cylinder: values.cylinder,
              seatNo: values.seat,
              engineNo: values.engineNo,
              chassisNo: parseInt(values.chassisNo, 10),
              horsePower: values.horsePower,
              vehicleDetailId: props.history.location.state.ID,
              npDate: npdate,
            };
          } else {
            createUser = {
              vehicleNoPlate: values.vehicleNoPlate,
              model: values.model,
              vehicleTypesId: values.vehicletype,
              companyId: values.companyName,
              sizes: values.sizes,
              estimatedLifeTime: values.estimatedLifeTime,
              cylinder: values.cylinder,
              seatNo: values.seat,
              engineNo: values.engineNo,
              chassisNo: parseInt(values.chassisNo, 10),
              horsePower: values.horsePower,
              npDate: npdate,
            };
          }
          httpClient
            .POST(
              "api/vehicle-details/create",
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
              props.history.push('/vehiclenext')
            })
            .catch((err) => {
              console.log(err.response);
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });
            });
        }}
      >
        {({ errors, touched }) => (
          <Form autocomplete="off" novalidate className="vehicle-form">
            <div className="veh-form">
              <div className="form-elements">
                <label className="form-label">Vehicle Number Plate</label>

                <Field
                  name="vehicleNoPlate"
                  class="form-input"
                  placeholder="Vehicle Number Plate"
                ></Field>
                {/* </select> */}

                {errors.vehicleNoPlate && touched.vehicleNoPlate ? (
                  <div className="error-message">{errors.vehicleNoPlate}</div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Company</label>
                <Field
                  as="select"
                  name="companyName"
                  class="form-input"
                  placeholder="Company"
                >
                  <option style={{ display: "none" }}>
                    {updatedata.companyName}
                  </option>
                  {companytypes.map((values) => (
                    <option value={values.ID}>{values.NAME}</option>
                  ))}
                </Field>
                {errors.companyName && touched.companyName ? (
                  <div className="error-message">{errors.companyName}</div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Engine No</label>
                <Field
                  name="engineNo"
                  class="form-input"
                  placeholder="Engine Number"
                ></Field>
                {errors.engineNo && touched.engineNo ? (
                  <div className="error-message">{errors.engineNo}</div>
                ) : null}
              </div>
            </div>
            <div className="veh-form">
              <div className="form-elements">
                <label className="form-label">Model</label>
                <Field
                  name="model"
                  class="form-input"
                  placeholder="Model"
                ></Field>
                {errors.model && touched.model ? (
                  <div className="error-message">{errors.model}</div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Size</label>
                <Field
                  name="sizes"
                  class="form-input"
                  placeholder="Size"
                ></Field>
                {errors.sizes && touched.sizes ? (
                  <div className="error-message">{errors.sizes}</div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Chassis No</label>
                <Field
                  name="chassisNo"
                  class="form-input"
                  placeholder="Chessis Number"
                ></Field>
                {errors.chassisNo && touched.chassisNo ? (
                  <div className="error-message">{errors.chassisNo}</div>
                ) : null}
              </div>
            </div>
            <div className="veh-form">
              <div className="form-elements">
                <label className="form-label">Vehicle Type</label>
                <Field
                  as="select"
                  name="vehicletype"
                  class="form-input"
                  placeholder="Vehicle Type"
                >
                  <option value="" style={{ display: "none" }}>
                    {updatedata.vehicletype}
                  </option>
                  {userdata.map((values) => (
                    <option value={values.ID}>{values.NAME}</option>
                  ))}
                </Field>
                {errors.vehicletype && touched.vehicletype ? (
                  <div className="error-message">{errors.vehicletype}</div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Estimated Life Time</label>
                <Field
                  name="estimatedLifeTime"
                  class="form-input"
                  placeholder="Life Span"
                ></Field>
                {errors.estimatedLifeTime && touched.estimatedLifeTime ? (
                  <div className="error-message">
                    {errors.estimatedLifeTime}
                  </div>
                ) : null}
              </div>
              <div className="form-elements">
                <label className="form-label">Horse Power</label>
                <Field
                  name="horsePower"
                  class="form-input"
                  placeholder="Horse Power"
                ></Field>
                {errors.horsePower && touched.horsePower ? (
                  <div className="error-message">{errors.horsePower}</div>
                ) : null}
              </div>
            </div>
            <div className="veh-form">
              <div className="form-elements">
                <label className="form-label">Cylinder</label>
                <Field
                  name="cylinder"
                  class="form-input"
                  placeholder="Cylinder"
                ></Field>
                {errors.cylinder && touched.cylinder ? (
                  <div className="error-message">{errors.cylinder}</div>
                ) : null}
              </div>
              {propsavailable ? null : (
                <div className="form-elements">
                  <label className="form-label">NP Date</label>
                  <Calendar
                    onChange={handleDate}
                    value={updatedata.npDate}
                    // name="npDate"
                    class="form-input"
                  />
                  {/* {errors.npDate && touched.npDate ? (
                    <div className="error-message">{errors.npDate}</div>
                  ) : null} */}
                </div>
              )}
              <div className="form-elements">
                <label className="form-label">Seat</label>
                <Field
                  name="seat"
                  class="form-input"
                  placeholder="Seat"
                ></Field>
                {errors.seat && touched.seat ? (
                  <div className="error-message">{errors.seat}</div>
                ) : null}
              <div className="save-cancel-col">
                <Button
                  disabled={Object.values(errors).length > 0 ? true : false}
                  // onClick={() => {
                  //   setIsButtonLoading(true);
                  //   setTimeout(() => {
                  //     setIsButtonLoading(false);
                  //   }, 1000);
                  // }}
                  isLoading={isButtonLoading}
                  type="submit"
                  className="btn btn-danger btn-cancel-save"
                  id="save-button"
                >
                  <span>Next</span>
                </Button>
              </div>
              </div>
              
              
            </div>
          </Form>
        )}
      </Formik>
    </div>
    /* </div>
    </div> */
  );
}

export default Vehicle;
