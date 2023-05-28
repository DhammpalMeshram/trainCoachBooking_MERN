import "./Header.css";

import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Header = ()=>{
    return (
        <div id="header">
            <div className ="subHead sub1">
                <ImportantDevicesIcon/>
                <p>BookMySeat.com</p>
            </div>
            <div className ="subHead sub2">
                <input type="text"/>
                <SearchIcon/>
            </div>
            <div className ="subHead sub3">
            <button> Search </button>
        </div>
            <div className ="subHead sub4">
                <AccountCircleIcon/>
            </div>
        </div>
    )
}

export default Header;

