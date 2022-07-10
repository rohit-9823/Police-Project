import React, { useEffect, useRef, useState } from "react";
import { notify } from "../../constants/notify";
import { httpClient } from "../../constants/httpClient";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate } from "../datetime/dateTime";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./vehicledetailView.css";
// import "./viewuser.css"

function Vehicledetailview(props) {
  const [userdata, setuserdata] = useState([]);
  const [time, setTime] = useState(new Date());
  const userapi = async () => {
    httpClient
      .GET("api/vehicle-details/get-all/0/20", false, true)
      .then((resp) => {
        console.log(resp);
        let finalData = resp.data.data.content.map((item) => {
          if (item.STATUS == 0) {
            item.STATUS = "Inactive";
          } else {
            item.STATUS = "Active";
          }
          
          return item;
        });
        
        
        setuserdata(finalData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEdit = (e, rowData) => {
    props.history.push("/vehicle", rowData);
  };

  const handleDelete = (e, rowData) => {
    console.log(rowData);
    let id = rowData.ID;
    httpClient
      .DELETE(`api/company/change-status/true/${id}`, false, true)
      .then((resp) => {
        notify.success(resp.data.message);
        console.log(resp);

        setTimeout(() => {
          userapi();
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    userapi();
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
  const tableRef = React.createRef();
  return (
    <div className="details">
      <div className="heading_line">
        <p className="text04">Vehicle Details</p>
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
        <Link to="../vehicle">
          <button className="btn-details">Vehicle Entry</button>
        </Link>

        <button className="btn-details" id="btn-selected">
          View Vehicle
        </button>
      </div>

      <Row className="rows-branch">
        <Col sm={12} className="cols">
          <Typography
            variant="h5"
            color="textSecondary"
            component="h2"
            gutterBottom
            style={{ padding: "20px 0px 10px 0px" }}
          ></Typography>
          <MaterialTable
            tableRef={tableRef}
            options={{
              pageSize: 5,

              search: true,
              actionsColumnIndex: -1,

              headerStyle: {
                backgroundColor: "#25385f",
                color: "#FFF",

                position: "sticky",
                top: "0",
              },
              maxBodyHeight: "400px",
            }}
            title="Vehicle"
            columns={[
              { title: "S.N", render: rowData => rowData.tableData.id + 1 },
              {
                title: "NP Date",
                field: "NPDATE",
                customSort: (a, b) => a.name.length - b.name.length,
              },
              { title: "Chassis No", field: "CHASSISNO" },
              { title: "Company", field: "COMPANYNAME" },
              { title: "Cylinder", field: "CYLINDER" },
              { title: "Entry Date", field: "ENTRYDATE" },
              { title: "Estimated Life", field: "ESTIMATEDLIFETIME" },
              { title: "Horsepower", field: "HORSEPOWER" },
              { title: "MODEL", field: "MODEL" },
              { title: "Seat No", field: "SEATNO" },
              { title: "Vehicle Type", field: "VEHICLETYPENAME" },
              {
                title: "Status",
                field: "STATUS",
                cellStyle: (e, rowData) => {
                  if (rowData.STATUS == "Active") {
                    return { color: "#32CD32" };
                  } else {
                    return { color: "red" };
                  }
                },
              },
            ]}
            data={userdata}
            localization={{
              pagination: {
                previousAriaLabel: "",
                previousTooltip: "",
                nextAriaLabel: "",
                nextTooltip: "",
                firstAriaLabel: "",
                firstTooltip: "",
                lastAriaLabel: "",
                lastTooltip: "",
              },
            }}
            actions={[
              {
                icon: Add,
                tooltip: "Add Record",
                isFreeAction: true,
              },

              {
                icon: () => <i class="fas fa-eye fa-xs"></i>,
                tooltip: "View User",
                onClick: (event, rowdata) =>
                  //  console.log(rowdata.id)

                  Swal.fire({
                    showConfirmButton:false,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    html: `
                <div class="right">
                <span className="text05view" style="font-size:12px">${currentdate}</span>
                
                <p style="margin: 2px 0px">Vehicle Information</p>
                
                </div><br>
                
                <table id="table" class="table2">
                <tbody>
                      <tr>
                        <td class="topic">Np Date :</td>
                        <td>${rowdata.NPDATE}</td>
                        <td></td>
                        <td class="topic">Chassis No :</td>
                        <td>${rowdata.CHASSISNO}</td>
  
                      </tr>
                      <tr>
                        <td class="topic">Company Name :</td>
                        <td>${rowdata.COMPANYNAME}</td>
                        <td></td>
                        <td class="topic">Cylinder :</td>
                        <td>${rowdata.CYLINDER}</td>
  
                      </tr>
                      <tr>
                      <td class="topic">Entry Date :</td>
                      <td>${rowdata.ENTRYDATE}</td>
                      <td></td>
                      <td class="topic">Life Span :</td>
                      <td>${rowdata.ESTIMATEDLIFETIME}</td>
                    </tr>
                    <tr>
                    <td class="topic">Horsepower :</td>
                    <td>${rowdata.HORSEPOWER}</td>
                    <td></td>
                    <td class="topic">Model :</td>
                    <td>${rowdata.MODEL}</td>
                  </tr>
                  <tr>
                  <td class="topic">Seat No :</td>
                  <td>${rowdata.SEATNO}</td>
                  <td></td>
                  <td class="topic">Vehicle Name :</td>
                  <td>${rowdata.VEHICLETYPENAME}</td>
                </tr>
                  
                </tbody>
        </table>`,
                  })
              },
              {
                icon: Edit,
                tooltip: "Edit Record",
                onClick: (e, rowData) => {
                  handleEdit(e, rowData);
                },
              },
              {
                icon: Delete,
                tooltip: "Delete Record",
                // onClick: (e,rowData) => {handleDelete(e,rowData)},
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Vehicledetailview;
