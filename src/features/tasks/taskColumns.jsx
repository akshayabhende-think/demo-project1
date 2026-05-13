import { Tag } from "antd";
import TaskActionCell from "./TaskActionCell";

const PRIORITY_COLORS = {
    Urgent: "red",
    High: "red",
    Medium: "gold",
    Low: "green",
};

const STATUS_COLORS = {
    Pending: "red",
    Completed: "green",
    Resolved: "blue",
};

const renderPriority = (priority) => (
    <Tag
        color={PRIORITY_COLORS[priority] ?? "default"}
        className="task-priority-tag"
    >
        {priority}
    </Tag>
);

const renderStatus = (status) => (
    <Tag
        color={STATUS_COLORS[status] ?? "default"}
        className="task-status-tag"
    >
        {status}
    </Tag>
);

export const buildTaskColumns = ({ onView, onEdit, activeTab } = {}) => {
    const showAssignTo = activeTab !== "my";

    return [
        {
            title: "Task Name",
            dataIndex: "name",
            width: 180,
            render: (name) => <span className="task-name-cell">{name}</span>,
        },
        {
            title: "Task Description",
            dataIndex: "description",
            width: 200,
            ellipsis: true,
            render: (val) => val || "--",
        },
        {
            title: "Priority",
            dataIndex: "priority",
            width: 110,
            render: renderPriority,
        },
        {
            title: "Client Name",
            dataIndex: "clientName",
            width: 170,
            render: (val) => val || "--",
        },
        showAssignTo && {
            title: "Assign To",
            dataIndex: "assignTo",
            width: 150,
            render: (val) => val || "--",
        },
        {
            title: "Assignee",
            dataIndex: "assignee",
            width: 150,
            render: (val) => val || "--",
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            width: 120,
            render: (val) => val || "--",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: 120,
            render: renderStatus,
        },
        {
            title: "Action",
            key: "action",
            width: 70,
            render: (_, record) => (
                <TaskActionCell record={record} onView={onView} onEdit={onEdit} />
            ),
        },
    ].filter(Boolean);
};
