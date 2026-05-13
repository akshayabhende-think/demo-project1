import DobCell from "../prospects/DobCell";

export const buildClientColumns = () => [
    { title: "Client ID", dataIndex: "id", width: 80 },
    {
        title: "Client Name",
        dataIndex: "name",
        width: 200,
        render: (name) => <span className="client-name-cell">{name}</span>,
    },
    {
        title: "Date of Birth",
        dataIndex: "dob",
        width: 170,
        render: (dob) => <DobCell dob={dob} />,
    },
    {
        title: "Contact Details",
        dataIndex: "email",
        ellipsis: true,
        render: (email) => email || "--",
    },
    {
        title: "Primary Counselor",
        dataIndex: "primaryCounselor",
        width: 180,
        render: (val) => val || "--",
    },
    {
        title: "Program",
        dataIndex: "program",
        width: 130,
        render: (val) => val || "--",
    },
    {
        title: "Group",
        dataIndex: "group",
        width: 110,
        render: (val) => val || "--",
    },
];
