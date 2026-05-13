import './Navbar.css'
// import { PiSquaresFour } from "react-icons/pi";
import SidebarDropdown, {menuItems} from './SidebarDropdown';
// import menuItems from './SidebarDropdown'
import { useState } from 'react';
import NavSwitcher from './NavSwitcher';
import { VscAccount } from "react-icons/vsc";
import { useLocation } from 'react-router-dom';
import { VscBell } from "react-icons/vsc";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const location = useLocation()
    // const [selected, setSelected] = useState({
    //     label: "Inquiries",
    //     icon: <VscAccount />
    //     })

    const currentItem = 
        menuItems.find(item => item.path === location.pathname)
        || menuItems[0];
  return (
    <div className='navbar' style={{ position:"relative"}}>

        {/* <div className='navbar-left'>
            <button 
                className='menu-btn'
                onClick={() => setOpen(!open)}
            >
                <PiSquaresFour />
            </button>
            <span>Inquiries</span>
        </div>

        <SidebarDropdown open={open}/> */}

        
        <NavSwitcher
            label={currentItem.label}
            icon={currentItem.icon}
            open={open}
            setOpen={setOpen}
        />

        <SidebarDropdown
            open={open}
            setOpen={setOpen}
            // setSelected={setSelected}
        /> 
        

        <div className='navbar-center'>
            
            <input  placeholder='Search...'/>

        </div>

        <div className='navbar-right' style={{ display:'flex',gap:'15px'}}>
            <VscBell style={{fontSize:'24px'}}/>
            <div className='border'>

            </div>

            <div className='account'>
                <p style={{fontSize:'small'}}>SA</p>

            </div>

        </div>

            
      
    </div>
  )
}

export default Navbar
