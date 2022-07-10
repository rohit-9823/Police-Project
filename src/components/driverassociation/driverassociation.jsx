import React from "react";
import { Link } from "react-router-dom";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { Formik, setNestedObjectValues } from "formik";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import { Button } from "../Button-loader/Button-load";
import { httpClient } from "../../constants/httpClient";
import "./association.css";
import { useEffect, useState } from "react";
import { currentdate, currenttime } from "../datetime/dateTime";
import Select from "react-select";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import DriverAssociationVerify from "../validation/DriverAssociationVerify";
function DriverAssociation(props) {
  const [title, settitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [propsavailable, setpropsavailable] = useState();
  const [date, setDate] = useState();
  const [npdate, setnpDate] = useState();
  const [userdata, setuserdata] = useState([]);
  const [rawdata, setrawdata] = useState([]);
  const [vehicledata, setvehicledata] = useState({
    vehicleID: "",
    computerCode: "",
    startdate: "",
    policeUnit: "",
  });
  const [inputvalue,setinputvalue]=useState('')

  const [selectedvalue,setselectedvalue]=useState([])

  useEffect(() => {
    cls();
    apidata();
    fetchdatas();
    console.log(props);
  }, []);

  let cls = () => {
    if (props.history.location.state) {
      setpropsavailable(true);
      settitle("Update Driver Association")
      setvehicledata({
        computerCode: props.history.location.state.COMPUTERCODE,
        policeUnit: props.history.location.state.POLICEUNITID,
        vehicleID: props.history.location.state.DESCRIPTION,
      });
    } else {
      settitle("Driver Association")
      setpropsavailable(false);
    }
  };

  const handleDate = ({ bsDate, adDate }) => {
    setDate(bsDate);
  };
  const handleDate2 = ({ bsDate, adDate }) => {
    setnpDate(bsDate);
  };

const handleInputChange=value=>{
  setinputvalue(value)
}
const handleChange=(value)=>{
  console.log('changed');
}



const fetchdatas= async ()=>{
   return await httpClient.GET("api/vehicle-details/get-all/0/20", false, true).
   then(res=>{
   const result=res.data.data.content
   return result
   }
   )
}
const apidata = async () => {
  await httpClient
    .GET("api/vehicle-details/get-all-noPlates", false, true)
    .then((res) => setrawdata(res.data.data));
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
        <Link to="../driverassociation">
          <button className="btn-details" id="btn-selected">
            Association Details
          </button>
        </Link>

        <Link to="./viewdriverassociation">
          <button className="btn-details">Association View</button>
        </Link>
      </div>
      <Formik
        enableReinitialize
        initialValues={vehicledata}
        validationSchema={DriverAssociationVerify}
        onSubmit={async (values) => {
          let createUser = "";
          if (propsavailable) {
            createUser = {
              computerCode: values.computerCode,
              vehicleDetailsId: values.vehicleID,
              policeUnit: values.policeUnit,
            };
          } else {
            createUser = {
              computerCode: values.computerCode,
              vehicleDetailsId: values.vehicleID,
              startDate: date,
              policeUnit: values.policeUnit,
            };
          }

          httpClient
            .POST(
              "api/vehicle-driver/create",
              createUser,
              false,
              true,
              "createUser"
            )
            .then((res) => {
              setIsButtonLoading(false);
              toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
            })
            .catch((err) => {
              setIsButtonLoading(false);
              toast.error("Bad Credential !!!", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
              });
            });

          // let result = await AccountServices.verifyAccount(accountDetails,'POST','/verify-account');
          // if(result.data.parentrole){
          // localStorage.setItem('accountData', JSON.stringify(values));
          //   props.history.push('/cash-deposit-request');
          // }
        }}
      >
        {({ errors, touched , setFieldValue }) => (
          //   {/* Form started */}
          <Form className="companydetails-form">
            <div className="company-element">
              <div className="form-elements">
                <label className="form-label">Computer Code</label>
                <Field
                  name="computerCode"
                  class="form-input"
                  placeholder="Computer Code"
                ></Field>
                {errors.computerCode && touched.computerCode ? (
                  <div className="error-message">
                    {errors.computerCode}
                  </div>
                ) : null}
              </div>

              <div className="form-elements">
                <label className="form-label">Vehicle ID</label>
                <Select
                  // defaultValue={selectedOption}
                  // onChange={setSelectedOption}
                  options={rawdata}
                  name="vehicleID"
                  onChange={(option) => (
                    setFieldValue("vehicleID", option.value)
                  )}
                />
                {errors.vehicleID && touched.vehicleID ? (
                  <div className="error-message">{errors.vehicleID}</div>
                ) : null}
              </div>
            </div>
            <div className="company-element">
              {propsavailable ? null : (
                <div className="form-elements">
                  <label className="form-label">Start Date</label>
                  <Calendar
                    onChange={handleDate}
                    name="startdate"
                    class="form-input"
                  />
                </div>
              )}
            
              <div className="form-elements">
                <label className="form-label">Police Unit</label>
                <Field
                  name="policeUnit"
                  class="form-input"
                  placeholder="Police Unit"
                ></Field>
                {/* {errors.policeUnit && touched.policeUnit ? (
                  <div className="error-message">{errors.policeUnit}</div>
                ) : null} */}
              
              <div className="vehform-save-cancel-col responsive-save-cancel">
                
                <Button
                  disabled={Object.values(errors).length > 0 ? true : false}
                  onClick={() => {
                    setIsButtonLoading(true);
                    setTimeout(() => {
                      setIsButtonLoading(false);
                    }, 1000);
                  }}
                  isLoading={isButtonLoading}
                  type="submit"
                  className="btn btn-danger btn-cancel-save-vehassociation"
                  id="save-button"
                >
                  <span>Save</span>
                </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DriverAssociation;
