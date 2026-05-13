import { useEffect, useRef } from 'react';
import './Sidebar.css'
import { PiSquaresFour } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoListOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { VscSave } from "react-icons/vsc";
import { LiaClipboardListSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';

export const menuItems = [
    {label: "Dashboard",path:"/dashboard", icon: <PiSquaresFour />},
    {label: "Inquiries",path:"/", icon: <VscAccount />},
    {label: "Prospect",path:"/prospect", icon: <MdOutlineManageAccounts />},
    {label: "Client",path:"/client", icon: <MdOutlineSupervisorAccount />},
    {label: "Groups",path:"/groups", icon: <MdGroups />},
    {label: "Scheduling",path:"/scheduling", icon: <MdOutlineCalendarToday />},
    {label: "Task",path:"/task", icon: <IoListOutline />},
    {label: "Toxicology",path:"/toxicology", icon: <GoPencil />},
    {label: "Reports",path:"/reports", icon: <VscSave />},
    {label: "Billing",path:"/billing", icon: <LiaClipboardListSolid />},
    {label: "Settings",path:"/settings", icon: <IoSettingsOutline />},
]

const SidebarDropdown = ({open, setOpen, setSelected }) => {
    const ref = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick)
    }, [setOpen])
    if (!open) return null;

  return (
    <div ref={ref} className='sidebar-dropdown'>
        {menuItems.map((item, index) => (
            <div
                key={index}
                className={`menu-item ${
                    location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => {
                    navigate(item.path);
                    // setSelected(item.label)
                    setOpen(false)
                }}
            >
                <span className='icon'>{item.icon}</span>
                {item.label}
            </div>
        ))}
      
    </div>
  )
}

export default SidebarDropdown
