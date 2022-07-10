import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import UsbIcon from '@mui/icons-material/Usb';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import "../components/navbar/navbar.css"
export const Menuitems = [
    
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon className="icon_sidebar" />, 
      path: '/' 
    },
    { 
      text: 'Vehicle Details', 
      icon: <DesignServicesIcon className="icon_sidebar" />, 
      path: '/vehicle' 
    },
      
      { 
        text: 'User', 
        icon: <SubjectOutlined className="icon_sidebar" />, 
        path: '/user' 
      },
      { 
        text: 'Nilami', 
        icon: <SubjectOutlined className="icon_sidebar" />, 
        path: '/nilami' 
      },
      
      { 
        text: 'Driver Association', 
        icon: <DesignServicesIcon className="icon_sidebar" />, 
        path: '/driverassociation' 
      },
      { 
        text: 'Report', 
        icon: <DashboardIcon className="icon_sidebar" />, 
        path: '/report' 
      },
      { 
        text: 'Settings', 
        icon: <PresentToAllIcon className="icon_sidebar" />, 
        path: '/setting' 
      },
      { 
        text: 'Master Data', 
        icon: <PresentToAllIcon className="icon_sidebar" />, 
        path: '/',
        subitem:1
      },
      
   
];
