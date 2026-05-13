export const buildAvailabilityColumns = () => [
    {
        title: "Name",
        dataIndex: "name",
        width: 200,
        render: (val) => <span className="appt-name-cell">{val}</span>,
    },
    {
        title: "Availability Slots",
        dataIndex: "availabilitySlots",
        width: 170,
        render: (val) => val || "--",
    },
    {
        title: "Block Days",
        dataIndex: "blockDays",
        width: 150,
        render: (val) => val || "--",
    },
    {
        title: "Last Updated On",
        dataIndex: "lastUpdatedOn",
        width: 170,
        render: (val) => val || "--",
    },
    {
        title: "Updated By",
        dataIndex: "updatedBy",
        width: 200,
        render: (val) => val || "--",
    },
];
