import { RiGroupLine } from "react-icons/ri";
import { BiUserPlus } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";
import {
  FileTextOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";

export const prospectStats = [
  {
    key: "total",
    title: "Total Leads",
    value: 18,
    icon: <RiGroupLine />,
    bgColor: "#e6f7ec",
  },
  {
    key: "new",
    title: "New Leads",
    value: 0,
    icon: <BiUserPlus />,
    bgColor: "#eaf1ff",
  },
  {
    key: "open",
    title: "Open Leads",
    value: 11,
    icon: <FileTextOutlined />,
    bgColor: "#fff5e6",
  },
  {
    key: "inProgress",
    title: "In Progress",
    value: 11,
    icon: <Loading3QuartersOutlined /> ,
    bgColor: "#ffece9",
  },
  {
    key: "qualified",
    title: "Qualified Lead",
    value: 0,
    icon: <CheckCircleOutlined />,
    bgColor: "#fff7e6",
  },
  {
    key: "noActivity",
    title: "No Activity",
    value: 7,
    icon: <BsMoon />,
    bgColor: "#eef0f5",
  },
  {
    key: "admitted",
    title: "Admitted",
    value: 0,
    icon: <EyeOutlined />,
    bgColor: "#eaf1ff",
  },
];
