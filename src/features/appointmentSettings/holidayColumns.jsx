import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const renderHolidayAction = (onEdit) => (_, record) => (
    <Button
        type="text"
        icon={<EditOutlined />}
        className="appt-holiday-edit-btn"
        onClick={() => onEdit?.(record)}
        aria-label="Edit holiday"
    />
);

export const buildHolidayColumns = ({ onEdit } = {}) => [
    {
        title: "Holiday Title",
        dataIndex: "title",
        width: 320,
        render: (val) => <span className="appt-name-cell">{val}</span>,
    },
    {
        title: "Date",
        dataIndex: "date",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Created Date",
        dataIndex: "createdDate",
        width: 200,
        render: (val) => val || "--",
    },
    {
        title: "Action",
        key: "action",
        width: 80,
        align: "right",
        render: renderHolidayAction(onEdit),
    },
];
