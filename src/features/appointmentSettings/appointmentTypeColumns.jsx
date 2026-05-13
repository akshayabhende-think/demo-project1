import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const TYPE_ACTION_ITEMS = [
    { key: "edit", label: "Edit" },
    { key: "duplicate", label: "Duplicate" },
    { key: "remove", label: "Remove" },
];

const renderColorSwatch = (color) => (
    <span
        className="appt-color-swatch"
        style={{ background: color || "#e5e7eb" }}
    />
);

const renderTypeAction = (onAction) => (_, record) => (
    <Dropdown
        menu={{
            items: TYPE_ACTION_ITEMS,
            onClick: ({ key }) => onAction?.(key, record),
        }}
        trigger={["click"]}
        placement="bottomRight"
    >
        <Button
            type="text"
            icon={<MoreOutlined />}
            className="appt-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

export const buildAppointmentTypeColumns = ({ onAction } = {}) => [
    {
        title: "Appointment Type",
        dataIndex: "name",
        width: 220,
        render: (val) => <span className="appt-name-cell">{val}</span>,
    },
    {
        title: "Description",
        dataIndex: "description",
        width: 320,
        render: (val) => val || "--",
    },
    {
        title: "Color",
        dataIndex: "color",
        width: 110,
        render: renderColorSwatch,
    },
    {
        title: "Duration",
        dataIndex: "duration",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Action",
        key: "action",
        width: 80,
        align: "right",
        render: renderTypeAction(onAction),
    },
];
