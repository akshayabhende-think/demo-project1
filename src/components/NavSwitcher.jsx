import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import './Navbar.css'

const NavSwitcher = ({ label, icon, open, setOpen, children }) => {
  return (

    <div className="nav-switcher-wrapper">

      

          <button className='nav-switcher' onClick={() => setOpen(!open)}>
            <span className="left">
              <span className='switcher-icon'>{icon}</span>
              <span className='switcher-text'>{label}</span>
            </span>
            {open ? (
              <FiChevronUp className="arrow"/>
            ) : (
              <FiChevronDown className="arrow"/>
            )}
          
        </button>

    

    {open && <div className="dropdown-menu">{children}</div>}


    </div>
    
  )
}

export default NavSwitcher
