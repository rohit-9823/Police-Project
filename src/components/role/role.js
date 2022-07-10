import React from "react";
import {useEffect, useState } from "react"
import { toast } from "react-toastify";
import dateTime, { currentdate } from "../datetime/dateTime";
import { Formik } from 'formik';
import { Form, Field } from 'formik';
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { useHistory } from "react-router-dom";
import AddroleVerify from "../validation/AddroleVerify"
import { Button } from "../Button-loader/Button-load";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import { Add, Delete } from "@material-ui/icons";
import { httpClient } from "../../constants/httpClient";
import { notify } from "../../constants/notify";
import Swal from "sweetalert2";


import "./role.css";

function Role(props) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showhide, setshowhide] = useState(true);
  const [color, setcolor] = useState(true);
  const [title, settitle] = useState('Role');
  const [roledata, setroledata] = useState([]);
  const history=useHistory()
  const roleapi = async () => {
    httpClient
      .GET("api-role/getall", false, true)
      .then((resp) => {
        console.log(resp);
        let finalData=resp.data.data.map((item)=>{
          if(item.activeStatus==0){
            item.activeStatus="Inactive"
          }
          else{
            item.activeStatus="Active"
          }
          return item
        })
        setroledata(finalData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDeleteBranch=(e,rowData)=>{
    let id=rowData.id
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        httpClient
        .DELETE(`api-delete/role/${id}`, false, true)
        .then((resp) => { 
          notify.success(resp.data.message)
          console.log(resp);
          setTimeout(() => {
        roleapi();
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
        Swal.fire(
          'Deleted!',
          'Your Record has been deleted.',
          'success'
        )
      }
    })

      }
  
    const handleViewRole=()=>{
        // props.history.push('/view-role')
        setshowhide(false)
        settitle('Role List')
        setcolor(false)
      
    }
    const handleDetailEntry=()=>{
      setshowhide(true)
      settitle('Role')
      setcolor(true)
      
    }
    
    useEffect(() => {  
      roleapi();
      
      const interval=setInterval(() => {
         setTime(new Date());
        }, 1000);
        return ()=>{
          clearInterval(interval)
       };
     }, [])
    
     

  return (
    <>
      {/* <div class="container"> */}
      <div className="details">
        <div className="heading_line">
          <h2 className="text04">{title}</h2>
          <div className="datetime">
            <img src={calendericon} className="datetime-logo" />
            <span className="text05">{currentdate}  </span>

            


            <img src={timeicon} className="datetime-logo" />  
            <span className="text05">{ time.toLocaleString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',})}</span>
          </div>
        </div>
        <div className="buttons-line">
          {color?<>
            <button className="btn-details" id="btn-selected" onClick={handleDetailEntry}>
              Detail entry
            </button>
          
          <button className="btn-details" onClick={handleViewRole} >Detail view</button>
          </>
          :<><button className="btn-details" onClick={handleDetailEntry}>
              Detail entry
            </button><button className="btn-details" id="btn-selected" onClick={handleViewRole}>Detail view</button></>}
        </div>
{showhide?
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={AddroleVerify}
          onSubmit={async (values) => {
            setIsButtonLoading(true)
            let roleDetails = {
              name: values.name,
              description: values.description,
            };

            httpClient
              .POST("api-role/create", roleDetails, false, true, "roleDetails")
              .then((res) => {
                setTimeout(() => {
                  setIsButtonLoading(false);
                }, 1000);
                // setIsButtonLoading(false);
                roleapi();
                toast.success(res.data.message, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 1000,
                });
                props.history.push('/role')
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
            <Form autocomplete="off" novalidate>
              {/* <!-- Main Row Started--> */}
              <div class="row">
                <div class="col-lg-12">
                  {/* <!-- First Row Started--> */}
                  <div class="role-form">
                    <div class="cols">
                      <div class="form-element">
                        <label class="form-label" for="name">
                          Role Name
                        </label>
                      </div>
                      <Field
                        name="name"
                        class="form-input"
                        placeholder="Role Name"
                      >
                        {/* <Field as="select"  onChange={(e)=>handleChange(e)} name="name" class="form-control shadow-none undefined"> */}
                      </Field>
                      {/* </select> */}

                      {errors.name && touched.name ? (
                        <div className="error-message">{errors.name}</div>
                      ) : null}
                    </div>
                    <div class="cols">
                      {/* <!-- Select With Search Started --> */}
                      <div class="form-element">
                        <label class="form-label">Role Description</label>
                      </div>
                      <Field
                        name="description"
                        placeholder="Role Description"
                        class="form-input"
                      />

                      {errors.description && touched.description ? (
                        <div className="error-message">
                          {errors.description}
                        </div>
                      ) : null}
                      <div className="save-cancel-col">


                        <div className="w-100 text-right">
                          <Button
                            disabled={
                              Object.values(errors).length > 0 ? true : false
                            }
                            // onClick={(value) => {
                              
                            //   // setIsButtonLoading(true);
                            //   setTimeout(() => {
                            //     // setIsButtonLoading(false);
                            //   }, 1000);
                            // }}
                            isLoading={isButtonLoading}
                            type="submit"
                            className="btn btn-danger btn-cancel-save"
                            id="blue"
                          >
                            <span></span> Verify
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                        
                        
          
          </div>
            </Form>
          )}
        </Formik>
        :
        <div>
        <Row
          className="rows-branch"
        >
          <Col sm={12} className="cols">
            <Typography
              variant="h5"
              color="textSecondary"
              component="h2"
              gutterBottom
              style={{ padding: "20px 0px 10px 0px" }}
            >


            </Typography>
            <MaterialTable
              options={{

                
                  pageSize: 10,
                  
                  thirdSortClick: false,
                  search: true,
                 actionsColumnIndex: -1,
                
                
                  headerStyle: {
                    backgroundColor: "#25385f",
                    color: "#FFF",
                 
                    position: "sticky",
                    top: "0"
                  },
                  maxBodyHeight: "400px"

              }}
              title="Role"
              columns={[
                { title: "Role Name", field: "name" },
                { title: "Description", field: "description" },
                { title: "Status", field: "activeStatus"  ,  cellStyle: (e, rowData) => {
                
                  if (rowData.activeStatus=="Active") {
                    return { color:"#32CD32" };
                  }
                  else{
                    return{color:'red'}
                  }
                },},
              ]}
              data={roledata}
              localization={{
                pagination: {
                  previousAriaLabel:'',
                  previousTooltip:'',
                  nextAriaLabel:'',
                  nextTooltip:'',
                  firstAriaLabel:'',
                  firstTooltip:'',
                  lastAriaLabel:'',
                  lastTooltip:''
                },
              }}
              actions={[
                {
                  icon: Add,
                  tooltip: "Add Role",
                  isFreeAction: true,
                },
                {
                  icon: Delete,
                  tooltip: "Delete Record",
                  onClick: (e,rowData) => {handleDeleteBranch(e,rowData)},
                },
              ]}
            />
          </Col>
        </Row>
      </div>
        
        }
      </div>
      
    </>
  );
}

export default Role;
