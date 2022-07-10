import React, { useEffect, useRef, useState } from 'react'
import { notify } from '../../constants/notify';
import { httpClient } from '../../constants/httpClient';
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit,Add, Delete } from "@material-ui/icons";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate } from "../datetime/dateTime";

import MaterialTable from "material-table";
import "./viewuser.css"
import Swal from 'sweetalert2';
function Viewuser(props) {
    const [userdata, setuserdata] = useState([]);
    const [time, setTime] = useState(new Date());
    const userapi = async () => {
        httpClient
          .GET("api/all", false, true)
          .then((resp) => {
            console.log(resp);
            let finalData=resp.data.data.map((item)=>{
              if(item.activestatus==0){
                item.activestatus="Inactive"
              }
              else{
                item.activestatus="Active"
              }
              return item
            })
            setuserdata(finalData);
          })
          .catch((err) => {
            console.log(err.response);
          });
      };
    
      const handleEdit=(e,rowData)=>{
          props.history.push("/updateuser",rowData)
      }
    
    const handleDelete=(e,rowData)=>{
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
            .DELETE(`api/${id}`, false, true)
            .then((resp) => { 
              notify.success(resp.data.message)
              
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
      useEffect(() => {
          console.log(props);
        userapi()
        setInterval(() => {
            setTime(new Date());
           }, 1000);
     
      }, [])
      const tableRef   = React.createRef()
  return (
      <div className="details">
    
    <div className="heading_line">
        <p className="text04">User List</p>
        <div className="datetime">
          <img src={calendericon} className="datetime-logo" />
          <span className="text05">{currentdate}</span>
          <img src={timeicon} className="datetime-logo" />
          <span className="text05">{ time.toLocaleString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',})}</span>
        </div>
      </div>
      <div className="buttons-line">
            <button className="btn-details" id="btn-selected" onClick={()=>props.history.push('/user')}>
              Back to Entry
            </button>
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
          title="User"
          columns={[
            { title: "S.N", render: rowData => rowData.tableData.id + 1 },
            { title: "Name", field: "name" },
            { title: "Username", field: "username" },
            { title: "Rank", field: "rank" },
            { title: "Gender", field: "gender" },
            { title: "Computer Code", field: "computercode" },
            { title: "Status", field: "activestatus"  ,  cellStyle: (e, rowData) => {
            
              if (rowData.activestatus=="Active") {
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
              onClick: (e,rowData) => {
                const scopedRef = tableRef.current
                handleDelete(e,rowData).then(() => scopedRef.onQueryChange())
              },
            },
          ]}
          
        />
      </Col>
    </Row>
  </div>
    
  )
}

export default Viewuser