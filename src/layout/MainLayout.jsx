import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <div style={{padding: "16px"}}>
            <Outlet />

        </div>
        
      
    </div>
  )
}

export default MainLayout
