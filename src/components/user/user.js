import React from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Add, Delete } from "@material-ui/icons";
import updateUserVerify from "../validation/userVerify";
import userVerify from "../validation/userVerify";
import { Button } from "../Button-loader/Button-load";
import MaterialTable from "material-table";
import { notify } from "../../constants/notify";
import "./user.css";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate, currenttime } from "../datetime/dateTime";
function User(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [color, setcolor] = useState(true);
  const [title, settitle] = useState('User');
  const [showhide, setshowhide] = useState(true);
  const [time, setTime] = useState(new Date());
  const [userdata, setuserdata] = useState([]);
  const [updatedata, setupdatedata] = useState([]);
  

  let cls=()=>{
    if(props.history.location.state){
      setupdatedata({
      id:props.history.location.state.id,
     username:props.history.location.state.username,
     name:props.history.location.state.name,
     firstName:props.history.location.state.firstname,
     middleName:props.history.location.state.middlename,
     lastName:props.history.location.state.lastname,
     computercode:props.history.location.state.computercode,
     activeStatus:props.history.location.state.activeStatus,
     rank:props.history.location.state.rank,
     gender:props.history.location.state.gender,
    })
  }
}

const handleViewRole=()=>{
  props.history.push('/view-user')
  setshowhide(false)
  settitle('User List')
  setcolor(false)
}
const handleDetailEntry=()=>{
  setshowhide(true)
  settitle('User')
  setcolor(true)
  
}

  useEffect(() => {  

    cls()
console.log(props.history.location.state);
console.log(props);
    setInterval(() => {
       setTime(new Date());
      }, 1000);
   }, [])
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
          <span className="text05">{ time.toLocaleString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',})}</span>
        </div>
      </div>
      <div className="buttons-line">
      {color?<>
            <button className="btn-details" id="btn-selected" onClick={handleDetailEntry}>
              User entry
            </button>
          
          <button className="btn-details" onClick={handleViewRole} >User view</button>
          </>
          :<><button className="btn-details" onClick={handleDetailEntry}>
              User entry
            </button><button className="btn-details" id="btn-selected" onClick={handleViewRole}>User view</button></>}
      </div>
      {props.history.location.state==undefined ? 

<Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            middleName: "",
            mobileNumber: "",
            roleId: "",
          }}
          validationSchema={userVerify}
          onSubmit={async (values) => {
            setIsButtonLoading(true)
            let createUser = {
              username: values.username,
              password: values.password,
              confirmPassword: values.confirmPassword,
              firstName: values.firstName,
              lastName: values.lastName,
              middleName: values.middleName,
              mobileNumber: values.mobileNumber,
              roleId: values.roleId,
            };

        
          httpClient
            .POST("api/create-user", createUser, false, true, "createUser")
            .then((res) => {
              setTimeout(() => {
                setIsButtonLoading(false);  
              }, 1000);
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
       <Form autocomplete="off" novalidate className="userdetails-form">
              <div className="u-form">
                <div className="form-elements">
                  <label className="form-label">Username</label>

                  <Field
                    name="username"
                    class="form-input"
                    placeholder="UserName"
                  ></Field>
                  {errors.username && touched.username ? (
                    <div className="error-message">{errors.username}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">Password</label>
                  <Field
                    name="password"
                    type="password"
                    class="form-input"
                    placeholder="Password"
                  ></Field>
                  {errors.password && touched.password ? (
                    <div className="error-message">{errors.password}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    class="form-input"
                    type="password"
                    placeholder="Confirm Password"
                  ></Field>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="u-form">
              <div className="form-elements">
                  <label className="form-label">FirstName</label>
                  <Field
                    name="firstName"
                    class="form-input"
                    placeholder="FirstName"
                  ></Field>
                  {errors.firstName && touched.firstName ? (
                    <div className="error-message">{errors.firstName}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">MiddleName</label>
                  <Field
                    name="middleName"
                    class="form-input"
                    placeholder="MiddleName"
                  ></Field>
                  {errors.middleName && touched.middleName ? (
                    <div className="error-message">{errors.middleName}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">LastName</label>
                  <Field
                    name="lastName"
                    class="form-input"
                    placeholder="Last Name"
                  ></Field>
                  {errors.lastName && touched.lastName ? (
                    <div className="error-message">{errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className="u-form">                
              <div className="form-elements">
                  <label className="form-label">Mobile Number</label>
                  <Field
                    name="mobileNumber"
                    class="form-input"
                    placeholder="Mobile Number"
                  ></Field>
                  {errors.mobileNumber && touched.mobileNumber ? (
                    <div className="error-message">{errors.mobileNumber}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">Role Id</label>
                  <Field
                    name="roleId"
                    class="form-input"
                    placeholder="Role Id"
                  ></Field>
                  {errors.roleId && touched.roleId ? (
                    <div className="error-message">{errors.roleId}</div>
                  ) : null}
                </div>

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
                    className="btn btn-danger btn-cancel-save-user"
                    id="save-button"
                  >
                    <span>Save</span>
                  </Button>
                </div>
              </div>
            </Form>
        )}
      </Formik>
:
<Formik
enableReinitialize={true}

          initialValues={{
            username: "",
            firstName: "",
            lastName: "",
            middleName: "",
            name: "",
            gender:"",
            computercode:"",
            rank:"",
          }}
          validationSchema={updateUserVerify}
          onSubmit={async (values) => {
            
            let editUser = {
              username: values.username,
              firstName: values.firstName,
              lastName: values.lastName,
              middleName: values.middleName,
              name: values.name,
              gender: values.gender,
              computercode: values.computercode,
              rank: values.rank,
            };

          httpClient
            .POST("api/update-user", editUser, false, true, "editUser")
            .then((res) => {
              setTimeout(() => {
                setIsButtonLoading(false);  
              }, 1000);
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
       <Form autocomplete="off" novalidate className="user-form">
              <div className="cols">
                <div className="form-elements">
                  <label className="form-label">Username</label>

                  <Field
                    name="username"
                    class="form-input"
                    value={updatedata.username}
                  ></Field>
                  {errors.username && touched.username ? (
                    <div className="error-message">{errors.username}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">Name</label>
                  <Field
                    name="name"
                    class="form-input"
                    value={updatedata.name}
                    onChange={(e)=>setupdatedata.name(e.target.value)}
                    
                  ></Field>
                  {errors.name && touched.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">MiddleName</label>
                  <Field
                    name="middleName"
                    class="form-input"
                    value={updatedata.middleName}
                    
                  ></Field>
                  {errors.middleName && touched.middleName ? (
                    <div className="error-message">
                      {errors.middleName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="cols">
                <div className="form-elements">
                  <label className="form-label">Gender</label>
                  <Field
                    name="gender"
                    class="form-input"
                    value={updatedata.gender}
                  ></Field>
                  {errors.gender && touched.gender ? (
                    <div className="error-message">{errors.gender}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">Computer Code</label>
                  <Field
                    name="computercode"
                    class="form-input"
                    value={updatedata.computercode}
                  ></Field>
                  {errors.computercode && touched.computercode ? (
                    <div className="error-message">{errors.computercode}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">LastName</label>
                  <Field
                    name="lastName"
                    class="form-input"
                    value={updatedata.lastName}
                    
                  ></Field>
                  {errors.lastName && touched.lastName ? (
                    <div className="error-message">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="cols">
                <div className="form-elements">
                  <label className="form-label">Rank</label>
                  <Field
                    name="rank"
                    class="form-input"
                    value={updatedata.rank}
                    
                  ></Field>
                  {errors.rank && touched.rank ? (
                    <div className="error-message">
                      {errors.rank}
                    </div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">FirstName</label>
                  <Field
                    name="firstName"
                    class="form-input"
                    value={updatedata.firstName}
                    
                  ></Field>
                  {errors.firstName && touched.firstName ? (
                    <div className="error-message">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>

               
                <div className="save-cancel-col">
                  <button className="btn-cancel-save" onClick={()=>props.history.push("/user")}>Cancel</button>

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
                    <span>Update</span>
                  </Button>
                </div>
              </div>
            </Form>
        )}
      </Formik>
      }
    </div>
    /* </div>
    </div> */
  );
}

export default User;
