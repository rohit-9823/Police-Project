import React, { useState } from "react";
import "./dashboard.css";
import { useHistory, Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import calendericon from "../../assets/images/uis_calender.png";
import timeicon from "../../assets/images/clock.png";
import { currentdate } from "../datetime/dateTime";
import MaterialTable from "material-table";
import Swal from 'sweetalert2';
import { notify } from '../../constants/notify';
import { httpClient } from '../../constants/httpClient';

function Dashboard(props) {
  const [userdata, setuserdata] = useState([]);
  const handleEdit = (e, rowData) => {
    props.history.push("/nilami", rowData);
  };
  const handleDelete = (e, rowData) => {
    let id = rowData.ID;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        httpClient
          .DELETE(`api-delete/nilami/${id}`, false, true)
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

        Swal.fire("Deleted!", "Your Record has been deleted.", "success");
      }
    });
  };
  const tableRef = React.createRef();

  const history = useHistory();
  const [title, settitle] = useState("Dashboard");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState();
  const [downup, setdownup] = useState(false);
  const [color, setcolor] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };
  const handlearrow = () => {
    setdownup(!downup);
  };
  let cls = downup ? "fa-solid fa-sort-up " : "fa-solid fa-caret-down";

  const userapi = async () => {
    httpClient
      .GET("api/vehicle-nilami/get-all/0/10", false, true)
      .then((resp) => {
        console.log(resp);
        let finalData=resp.data.data.content.map((item)=>{
          if(item.STATUS==0){
            item.STATUS="Inactive"
          }
          else{
            item.STATUS="Active"
          }
          return item
        })
        setuserdata(finalData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <div className="details">
        {/* -- Topic Line -- */}
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

        {/* -- Icons -- */}
        <div className="icons-grid">
          <div className="icon-card" id="clr1">
            <i class="fa fa-car icon-position"></i>
            <span className="text-number">100</span>
            <span className="text-small-icon">Total Vehicle Available</span>
          </div>
          <div className="icon-card" id="clr2">
            <i class="fa fa-car icon-position"></i>
            <span className="text-number">20</span>
            <span className="text-small-icon">Total Unused Vehicle</span>
          </div>
          <div className="icon-card" id="clr3">
            <i class="fa fa-file-text icon-position"></i>
            <span className="text-number">10</span>
            <span className="text-small-icon">Total Complain</span>
          </div>
          <div className="icon-card" id="clr4">
            <i class="fa fa-file-text icon-position"></i>
            <span className="text-number">2</span>
            <span className="text-small-icon">Resolved Complain</span>
          </div>
        </div>

        {/* -- Table -- */}
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
                pageSize: 10,

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
              title="Dashboard"
              columns={[
                { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
                { title: " Date", field: "DATE" },
                { title: "Np  Date", field: "NPDATE" },
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
                  tooltip: "Add User",
                  isFreeAction: true,
                },
                {
                  icon: Edit,
                  tooltip: "Edit User",
                  onClick: (e, rowData) => {
                    handleEdit(e, rowData);
                  },
                },
                {
                  icon: Delete,
                  tooltip: "Delete Record",
                  onClick: (e, rowData) => {
                    handleDelete(e, rowData);
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
