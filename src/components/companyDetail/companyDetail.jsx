import React from "react";
import { Link } from "react-router-dom";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { Formik } from "formik";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import { Button } from "../Button-loader/Button-load";
import { httpClient } from "../../constants/httpClient";
// import "../vehicle.css";
import "./companydetails.css"
import { useEffect, useState } from "react";
import { currentdate, currenttime } from "../datetime/dateTime";
import Companydetailvalid from "../validation/CompanydetailValid";
function Companydetail(props) {
  const [title, settitle] = useState('');
  const [time, setTime] = useState(new Date());
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [propsavailable, setpropsavailable] = useState();
  const [company, setcompany] = useState({
    
    name: "",
    description: "",
  });

  useEffect(() => {
    cls();
    console.log(props);
  }, []);

  let cls = () => {
    if (props.history.location.state) {
      settitle("Update Company")
      setpropsavailable(true)
      setcompany({
        name: props.history.location.state.NAME,
        description: props.history.location.state.DESCRIPTION,
      });
    }
    else{
      setpropsavailable(false)
      settitle("Company Details")
    }
  };

  
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
    <div className="buttons-line">
      <button className="btn-details"  id="btn-selected">Company Detail</button>

      <Link to='../companyview'>
        <button className="btn-details">
          Company View
        </button>
      </Link>
    </div>
<Formik
enableReinitialize
          initialValues={company}
          validationSchema={Companydetailvalid}
          onSubmit={async (values) => {
            setIsButtonLoading(true);
              let createUser=''
              if(propsavailable){
              createUser = {
                name: values.name,
                description: values.description,
                companyId:props.history.location.state.ID
              };
            }
            else{
              createUser = {
                name: values.name,
                description: values.description,
              };
            }
  

        
          httpClient
            .POST("api/company/create", createUser, false, true, "createUser")
            .then((res) => {
              setTimeout(() => {
                setIsButtonLoading(false);
              }, 1000);
              toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
              });
              props.history.push('/companyview')
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
        
        
        //   {/* Form started */}
          <Form className="companydetails-form">
            <div className="company-element">
              <div className="form-elements">
                  <label className="form-label">Company Name</label>
                  <Field
                    name="name"
                    class="form-input"
                    placeholder="Company Name"
                  ></Field>
                  {errors.name && touched.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                
              </div>            
            <div className="form-elements">
                  <label className="form-label">Company Description</label>
                  <Field
                    name="description"
                    class="form-input"
                    placeholder="Company Description"
                  ></Field>
                  {errors.description && touched.description ? (
                    <div className="error-message">{errors.description}</div>
                  ) : null}
                
                <div className="vehform-save-cancel-col responsive-save-cancel">
                {/* <button  type="button" className="veh-btn-cancel-save">Cancel</button> */}
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

export default Companydetail;


// name
// description
// companyid

