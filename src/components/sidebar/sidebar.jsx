import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import "./sidebar.css";
import logoicon from "../../assets/images/logonew.png";
import React from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Menuitems } from "../Menuitems";
import { useEffect,useState } from "react";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      // background: '#f9f9f9',
      // width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#3b4c6f",
      color: "#f2f2f2",
      borderLeft: "4px solid #417dd6",
      paddingLeft: "12px",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  
  useEffect(() => {
    console.log(props);
  }, [])
  
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar"; 
  
  return (
    
    // {/* SIDE DRAWER STARTED */}
      <div className={sidebarClass}>
    <div className="side-bar">
 
     
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div class="top">
            <img src={logoicon} className="sidebarlogo" />
            <p class="text01">Nepal Police</p>
          </div>

          {/* links/list section */}
          <List>
            {Menuitems.map((item) =>
              item.subitem == 1 ? (
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <InboxIcon className="icon_sidebar" />
                    </ListItemIcon>
                    <ListItemText className="text02" primary="Master Data" />
                    {open ? (
                      <ExpandLess className="icon_sidebar" />
                    ) : (
                      <ExpandMore className="icon_sidebar" />
                    )}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton
                        onClick={() => history.push("/policeunit")}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <StarBorder className="icon_sidebar" />
                        </ListItemIcon>
                        <ListItemText
                          className="text02"
                          primary="Police Unit"
                        />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => history.push("/vehicletype")}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <StarBorder className="icon_sidebar" />
                        </ListItemIcon>
                        <ListItemText
                          className="text02"
                          primary="Vehicle Type"
                        />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => history.push("/companydetail")}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <StarBorder className="icon_sidebar" />
                        </ListItemIcon>
                        <ListItemText
                          className="text02"
                          primary="Vehicle Company"
                        />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => history.push("/role")}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <StarBorder className="icon_sidebar" />
                        </ListItemIcon>
                        <ListItemText className="text02" primary="Role" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              ) : (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname == item.path ? classes.active : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText className="text02" primary={item.text} />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
      </div>
     
      {/* // SIDE DRAWER ENDED */}
      </div>
    </div> 
  );
}

export default Sidebar;
