import { Tag, Button } from "antd";
import { DesktopOutlined } from "@ant-design/icons";

const STATUS_COLORS = {
    SCHEDULED: "blue",
    CANCELLED: "red",
    COMPLETED: "green",
    "NO SHOW": "orange",
};

const renderStatus = (status) => (
    <Tag
        color={STATUS_COLORS[status] ?? "default"}
        className="appointment-status-tag"
    >
        {status}
    </Tag>
);

const renderTimeRange = (_, record) => `${record.start} - ${record.end}`;

const renderServiceTime = (minutes) =>
    minutes ? `${minutes} minutes` : "--";

const renderAction = (onStart) => (_, record) => (
    <Button
        type="default"
        icon={<DesktopOutlined />}
        onClick={() => onStart?.(record)}
        className="appointment-start-btn"
    >
        Start Appt.
    </Button>
);

export const buildAppointmentColumns = ({ onStart } = {}) => [
    {
        title: "Patient Name",
        dataIndex: "patientName",
        width: 160,
        render: (name) => <span className="appointment-patient-cell">{name}</span>,
    },
    { title: "Date", dataIndex: "date", width: 120 },
    {
        title: "Time",
        key: "time",
        width: 130,
        render: renderTimeRange,
    },
    {
        title: "Counsellor Name",
        dataIndex: "counsellorName",
        width: 160,
        render: (val) => val || "--",
    },
    {
        title: "Procedure",
        dataIndex: "procedure",
        width: 110,
        render: (val) => val || "--",
    },
    {
        title: "Location",
        dataIndex: "location",
        width: 110,
        render: (val) => val || "--",
    },
    {
        title: "Status",
        dataIndex: "status",
        width: 130,
        render: renderStatus,
    },
    {
        title: "Service Time",
        dataIndex: "serviceTime",
        width: 130,
        render: renderServiceTime,
    },
    {
        title: "Action",
        key: "action",
        width: 140,
        render: renderAction(onStart),
    },
];
