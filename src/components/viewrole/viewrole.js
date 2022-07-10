import React, { useState, useEffect } from "react";
import { history, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import { Add, Delete } from "@material-ui/icons";
import { Row, Col } from "react-bootstrap";
import { httpClient } from "../../constants/httpClient";
import { notify } from "../../constants/notify";
import "./viewrole.css"
import { useHistory } from "react-router-dom";
import { red } from "@material-ui/core/colors";
function Viewrole() {
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
        httpClient
        .DELETE(`api-role/${id}`, false, true)
        .then((resp) => { 
          notify.success(resp.data.message)
          console.log(resp);
          setTimeout(() => {
           roleapi()
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
      }
  useEffect(() => {
    roleapi();
  }, []);

  return (
    <div>
      <Row
        className="rows-branch details-roleview"
        // style={{
        //   paddingTop: "20px",
        //   position: "absolute",
        //   top: "35vh",
        //   left: "18%",
        // }}
      >
        <Col sm={12} className="cols">
          <Typography
            variant="h5"
            color="textSecondary"
            component="h2"
            gutterBottom
            style={{ padding: "20px 0px 10px 0px" }}
          >
            <h2 className="title">Role List</h2>

            <div className="buttons-line">
          
            <button className="btn-details"  onClick={()=>history.push('/role')}>
              Detail entry
            </button>
          <button className="btn-details"id="btn-select" style={{backgroundColor:'#417dd6',color:'#ebedf1'}} >Detail view</button>
        </div>


          </Typography>
          <div className="testing">
          <MaterialTable
            options={{
              search: true,
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#25385f",
                // backgroundColor:red,
                color: "#FFF",
              },
            }}
            title="Role"
            columns={[
              { title: "Name", field: "name" },
              { title: "Description", field: "description" },
              { title: "Status", field: "activeStatus"  ,  cellStyle: (e, rowData) => {
              
                if (rowData.activeStatus=="Active") {
                  return { color:"Lime" };
                }
                else{
                  return{color:'red'}
                }
              },},
            ]}
            data={roledata}
            actions={[
              {
                icon: Add,
                tooltip: "Add Branch",
                isFreeAction: true,
                //onClick: () => { handleAddRole()
              },
              {
                icon: Delete,
                //  onClick: (e, rowData) => { handleRole(e, rowData) },
                tooltip: "Delete Record",
                onClick: (e,rowData) => {
                  handleDeleteBranch(e,rowData);
                },
              },
            ]}
          />
          </div>
          
        </Col>
      </Row>
    </div>
  );
}

export default Viewrole;
