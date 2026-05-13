import GroupActionCell from "./GroupActionCell";

const formatEnrolled = (val) => {
    if (val === null || val === undefined) return "--";
    return String(val).padStart(2, "0");
};

export const buildGroupColumns = ({ onView, onEdit } = {}) => [
    {
        title: "Group Name",
        dataIndex: "name",
        width: 180,
        render: (name) => <span className="group-name-cell">{name}</span>,
    },
    { title: "Group ID", dataIndex: "id", width: 110 },
    { title: "Group Type", dataIndex: "groupType", width: 150 },
    { title: "Program", dataIndex: "program", width: 170 },
    {
        title: "Primary Counselor",
        dataIndex: "primaryCounselor",
        width: 180,
        render: (val) => val || "--",
    },
    {
        title: "Enrolled Client",
        dataIndex: "enrolledClient",
        width: 130,
        render: formatEnrolled,
    },
    { title: "Start Date", dataIndex: "startDate", width: 130 },
    {
        title: "Action",
        key: "action",
        width: 70,
        render: (_, record) => (
            <GroupActionCell
                record={record}
                onView={onView}
                onEdit={onEdit}
            />
        ),
    },
];
