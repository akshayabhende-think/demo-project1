import { RiGroupLine } from "react-icons/ri";
import { BiUserPlus } from "react-icons/bi";
import { FileTextOutlined, AlertOutlined } from "@ant-design/icons";


export const statsData = [
    {
        key: "clients",
        title: "Total Clients",
        value: 50,
        icon: <RiGroupLine />,
        bgColor: "#e6f7ff",
    },
    {
        key: 'tasks',
        title: "Tasks",
        value: 10,
        icon: <BiUserPlus />,
        bgColor: "#f6ffed",
    },
    {
        key: "notes",
        title: "Incomplete Notes",
        value: 15,
        icon: <FileTextOutlined />,
        bgColor: "#fff7e6", 
    },
    {
    key: "alerts",
    title: "Alerts",
    value: "02",
    icon: <AlertOutlined />,
    bgColor: "#fff1f0",
  },
]