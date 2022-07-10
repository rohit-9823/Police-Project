import React, { useEffect, useState } from 'react'
import { notify } from '../../constants/notify';
import { httpClient } from '../../constants/httpClient';
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit,Add, Delete } from "@material-ui/icons";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate } from "../datetime/dateTime";
import MaterialTable from "material-table";
import { Link } from 'react-router-dom';
// import "./viewuser.css"
import Swal from 'sweetalert2';

function Viewdriverassociation(props) {
    const [userdata, setuserdata] = useState([]);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        console.log(props);
        userapi()
        setInterval(() => {
            setTime(new Date());
           }, 1000);
      }, []);

    const userapi = async () => {
        httpClient
          .GET("api/vehicle-driver/get-all/0/5", false, true)
          .then((resp) => {
            console.log(resp);
            let finaldata=resp.data.data.content.map((value)=>{
                if(value.STATUS==1){
                    value.STATUS="Active"
                }
                else{
                    value.STATUS="Inactive"
                }
                return value
            })
            setuserdata(finaldata);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
    
      const handleEdit=(e,rowData)=>{
          props.history.push("/driverassociation",rowData)
      }
    
    const handleDelete=(e,rowData)=>{
        
        let id=rowData.ID
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
            // .DELETE(`api-delete/nilami/${id}`, false, true)
            .then((resp) => { 
              notify.success(resp.data.message)
              console.log(resp)
              
              setTimeout(() => {
                userapi();
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
      const tableRef   = React.createRef()
  return (
      <div className="details">
    
    <div className="heading_line">
        <p className="text04">Driver Association List</p>
        <div className="datetime">
          <img src={calendericon} className="datetime-logo" />
          <span className="text05">{currentdate}</span>
          <img src={timeicon} className="datetime-logo" />
          <span className="text05">{ time.toLocaleString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',})}</span>
        </div>
      </div>


      <div className="buttons-line">
        <Link to="../driverassociation">
          <button className="btn-details" >
            Association Details
          </button>
        </Link>

        <Link to="./viewdriverassociation">
          <button className="btn-details" id="btn-selected">Association View</button>
        </Link>
      </div>
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
        tableRef={tableRef}
          options={{

            
              pageSize: 10,
              
              
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
          title="Driver Association"
          columns={[
            { title: "S.N", render: rowData => rowData.tableData.id + 1 },
            { title: "Computer Code", field: "COMPUTERCODE" },
            { title: "Police Unit", field: "POLICEUNITID" },
            { title: "Start Date", field: "STARTDATE" },
            { title: "Status", field: "STATUS"  ,  cellStyle: (e, rowData) => {
            
              if (rowData.STATUS=="Active") {
                return { color:"#32CD32" };
              }
              else{
                return{color:'red'}
              }
            },},
          ]}
          data={userdata}
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
                tooltip: "Add User",
                isFreeAction: true,
              },
            {
              icon: Edit,
              tooltip: "Edit User",
              onClick: (e,rowData) => {handleEdit(e,rowData)},
            },
            {
              icon: Delete,
              tooltip: "Delete Record",
                onClick: (e,rowData) => {handleDelete(e,rowData)},
            },
          ]}
          
        />
      </Col>
    </Row>
  </div>
    
  )
}

export default Viewdriverassociation