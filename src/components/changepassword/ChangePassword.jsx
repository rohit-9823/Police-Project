import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Add, Delete } from "@material-ui/icons";
import Changepasswordverify from "../validation/changePasswordVerify";
import { Button } from "../Button-loader/Button-load";
import MaterialTable from "material-table";
import { notify } from "../../constants/notify";
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import "./ChangePassword.css";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate, currenttime } from "../datetime/dateTime";
function ChangePassword(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [color, setcolor] = useState(true);
  const [title, settitle] = useState('Change Password');
  const [showhide, setshowhide] = useState(true);
  const [showhide2, setshowhide2] = useState(true);
  const [time, setTime] = useState(new Date());
  const [userdata, setuserdata] = useState([]);
  const [updatedata, setupdatedata] = useState([]);


  const showhidePassword = () => {
    setshowhide(!showhide);
  };
  const showhidePassword2 = () => {
    setshowhide2(!showhide2);
  };
  
let cls = showhide ?  "fas fa-eye-slash":"fas fa-eye";
let cls2 = showhide2 ? "fas fa-eye-slash":"fas fa-eye";
  
useEffect(() => {  
    setInterval(() => {
       setTime(new Date());
      }, 1000);
   }, [])
  return (

    <div className="details">
      <div className="heading_line">
        <p className="text04">{title}</p>
        <div className="datetime">
          <img src={calendericon} className="datetime-logo" />
          <span className="text05">{currentdate}</span>
          <img src={timeicon} className="datetime-logo" />
          <span className="text05">{ time.toLocaleString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',})}</span>
        </div>
      </div>
      

  <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
            oldPassword: "",
          }}
          validationSchema={Changepasswordverify}
          onSubmit={async (values) => {
            console.log('clciked');
            let changepass = {
              
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
              oldPassword: values.oldPassword,
              
            };

        
          httpClient
            .PUT("api/update-user-password", changepass, false, true, "changepass")
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
        {({ errors, touched }) => (
       <Form autocomplete="off" novalidate className="changepassword-form">
         <div className="cols">   
                <div className="form-elements">
                  <label className="form-label">Old Password</label>
                  <div className="input-box">
                  <Field
                    name="oldPassword"
                    type={showhide ? "password" : "text" }
                    class="changepassword-form-input"
                    placeholder="New Password"
                  />
                  <i class={cls} id="errspan" onClick={showhidePassword}></i>
                  </div>
                  </div>
                  {errors.oldPassword && touched.oldPassword ? (
                    <div className="error-message">{errors.oldPassword}</div>
                  ) : null}
              </div>
              <div className="cols">   
                <div className="form-elements">
                  <label className="form-label">New Password</label>
                  <div className="input-box">
                  <Field
                    name="newPassword"
                    type={showhide ? "password" : "text" }
                    class="changepassword-form-input"
                    placeholder="New Password"
                  />
                  <i class={cls} id="errspan" onClick={showhidePassword}></i>
                  </div>
                  </div>
                  {errors.newPassword && touched.newPassword ? (
                    <div className="error-message">{errors.newPassword}</div>
                  ) : null}
              </div>
              <div className="cols">
                <div className="form-elements">
                  <label className="form-label">Confirm New Password</label>
                  <div className="input-box">
                  <Field
                    name="confirmPassword"
                    type={showhide2 ? "password" : "text" }
                    class="changepassword-form-input"
                    placeholder="Confirm New Password"
                  />
                  <i class={cls2} id="errspan" onClick={showhidePassword2}></i>
                  </div>                  
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
                <div className="save-cancel-col">

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
                    className="btn btn-danger btn-cancel-save"
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
    /* </div>
    </div> */
  );
}

export default ChangePassword;
