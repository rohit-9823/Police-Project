import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import * as Yup from 'yup';
import Typography from "@material-ui/core/Typography";
import { Add, Delete } from "@material-ui/icons";
import updateUserVerify from "../validation/updateUserVerify";
import userVerify from "../validation/userVerify";
import { Button } from "../Button-loader/Button-load";
import MaterialTable from "material-table";
import { notify } from "../../constants/notify";
import { toast } from "react-toastify";
import { httpClient } from "../../constants/httpClient";
import "./updateUser.css";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate, currenttime } from "../datetime/dateTime";
import { Formik, Form, Field } from "formik";

  function Updateuser(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [color, setcolor] = useState(true);
  const [title, settitle] = useState('User');
  const [showhide, setshowhide] = useState(true);
  const [showerrmsg, setshowerrmsg] = useState('');
  const [time, setTime] = useState(new Date());
  const [userdata, setuserdata] = useState([]);
  const [updatedata, setupdatedata] = useState({
    id:props.history.location.state.id,
    username:props.history.location.state.username,
    name:props.history.location.state.name,
    firstName:props.history.location.state.firstname,
    middleName:props.history.location.state.middlename,
    lastName:props.history.location.state.lastname,
    computerCode:props.history.location.state.computercode,
    activeStatus:props.history.location.state.activeStatus,
    rank:props.history.location.state.rank,
    gender:props.history.location.state.gender,
  });
  

    let cls=()=>{
      if(props.history.location.state){
        setupdatedata({
        id:props.history.location.state.id,
       username:props.history.location.state.username,
       name:props.history.location.state.name,
       firstName:props.history.location.state.firstname,
       middleName:props.history.location.state.middlename,
       lastName:props.history.location.state.lastname,
       computerCode:props.history.location.state.computerCode,
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

      const handler = (e) => {
        const re = /[0-9:]+/g;
        if (re.test(e.key)) {
           e.preventDefault();
        }
        // return (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122);
      };

      useEffect((e) => {  
        
        // cls()
        setInterval(() => {
           setTime(new Date());
          }, 1000);

          
       }, [])

       const handlechanging=(e)=>{

               setupdatedata({
                   ...updatedata,
                   [e.target.name]: e.target.value
                })

       }
       const checkfield=(e)=>{
        if(updatedata.username==''  || updatedata.gender=='' || updatedata.computerCode=='' || updatedata.lastName=='' || updatedata.rank=='' || updatedata.firstName==''){
          e.preventDefault();
      setshowerrmsg(' *All field must be filled out')
        }
        else{
          setshowerrmsg(" ")
          
        }
    
      }
  return (
    <div className="details">
    <div className="heading_line">
      <p className="text04">Update User</p>
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
      


      <Formik
         enableReinitialized={true}
              initialValues={updatedata}
          //validationSchema={updateUserVerify}

          onSubmit={async (values) => {
            console.log('hit submitted');

            let editUser = {
              username: updatedata.username,
              firstName: updatedata.firstName,
              lastName: updatedata.lastName,
              middleName: updatedata.middleName,
              gender: updatedata.gender,
              computerCode: updatedata.computerCode,
              rank: updatedata.rank,
            };
            console.log(editUser);
        
          httpClient
            .PUT(`api/update-user/${updatedata.id}`, editUser, false, true, "editUser")
            .then((res) => {
              setIsButtonLoading(false);
              toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
                props.history.push('/view-user')

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
        {({ errors,touched }) => (
       <Form autocomplete="off" novalidate className="user-form">
              <div className="cols">
                <div className="form-elements">
                  <label className="form-label">Username</label>

                  <Field
                    name="username"
                    class="form-input"
                    value={updatedata.username}
                    onChange={handlechanging}
                  ></Field>
                  {errors.username && touched.username ? (
                    <div className="error-message">{errors.username}</div>
                  ) : null}
                </div>
                
                <div className="form-elements">
                  <label className="form-label">MiddleName</label>
                  <Field
                    name="middleName"
                    class="form-input"
                    value={updatedata.middleName}
                    onChange={handlechanging}
                    onKeyPress={(e) => handler(e)}
                    
                  ></Field>
                  {errors.middleName && touched.middleName ? (
                    <div className="error-message">
                      {errors.middleName}
                    </div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">LastName</label>
                  <Field
                    name="lastName"
                    class="form-input"
                    value={updatedata.lastName}
                    onChange={handlechanging}
                    onKeyPress={(e) => handler(e)}
                    
                  ></Field>
                  {errors.lastName && touched.lastName ? (
                    <div className="error-message">
                      {errors.lastName}
                    </div>
                  ) : null}
                </div>


                <br/>
                <p className="update_p">{showerrmsg}</p>
              </div>
              <div className="cols">
                <div className="form-elements">
                  <label className="form-label">Gender</label>
                  <Field
                    name="gender"
                    class="form-input"
                    value={updatedata.gender}
                    onChange={handlechanging}
                    onKeyPress={(e) => handler(e)}
                  ></Field>
                  {errors.gender && touched.gender ? (
                    <div className="error-message">{errors.gender}</div>
                  ) : null}
                </div>
                <div className="form-elements">
                  <label className="form-label">Computer Code</label>
                  <Field
                    name="computerCode"
                    class="form-input"
                    value={updatedata.computerCode}
                    onChange={handlechanging}
                    onKeyPress={(e) => handler(e)}
                  ></Field>
                  {errors.computerCode && touched.computerCode ? (
                    <div className="error-message">{errors.computerCode}</div>
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
                    onChange={handlechanging}
                    onKeyPress={(e) => handler(e)}
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
                    onChange={handlechanging}
                    onKeyPress={(e) => handler(e)}
                    
                  ></Field>
                  {errors.firstName && touched.firstName ? (
                    <div className="error-message">
                      {errors.firstName}
                    </div>
                  ) : null}
                </div>
                
                

               
                <div className="save-cancel-col">
                  <button className="btn-cancel-save" type="button" onClick={()=>props.history.push("/user")}>Cancel</button>

                  <Button
                    disabled={Object.values(errors).length > 0 ? true : false}
                    onClick={(e) => {
                      checkfield(e);
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
      </div>
  );
}
  

export default Updateuser