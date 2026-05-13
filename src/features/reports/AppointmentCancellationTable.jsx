import { memo, useMemo } from "react";
import { Tag } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1900 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const CANCEL_CLASS = {
    Client: "rpt-cancel-client",
    Facility: "rpt-cancel-facility",
    Rescheduled: "rpt-cancel-rescheduled",
};

const AppointmentCancellationTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Client name"),
                dataIndex: "clientName",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Client ID"),
                dataIndex: "clientId",
                width: 100,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Appointment date"),
                dataIndex: "appointmentDate",
                width: 150,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Appointment type"),
                dataIndex: "appointmentType",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Group name"),
                dataIndex: "groupName",
                width: 120,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Scheduled start time"),
                dataIndex: "scheduledStart",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Cancellation type"),
                dataIndex: "cancellationType",
                width: 160,
                align: "center",
                render: (val) =>
                    !val || val === "-" ? (
                        "--"
                    ) : (
                        <Tag className={`rpt-pill ${CANCEL_CLASS[val] || ""}`}>
                            {val}
                        </Tag>
                    ),
            },
            {
                title: renderTitle("Rescheduled appointment date"),
                dataIndex: "rescheduledDate",
                width: 220,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Cancellation reason"),
                dataIndex: "cancellationReason",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Primary counselor"),
                dataIndex: "primaryCounselor",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Program enrolled"),
                dataIndex: "programEnrolled",
                width: 150,
                align: "center",
                render: (val) => (
                    <span
                        className={
                            val === "Yes"
                                ? "rpt-ontime-yes"
                                : val === "No"
                                ? "rpt-ontime-no"
                                : ""
                        }
                    >
                        {val || "--"}
                    </span>
                ),
            },
            {
                title: renderTitle("Phase"),
                dataIndex: "phase",
                width: 100,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Days since last attended service"),
                dataIndex: "daysSinceLastService",
                width: 240,
                render: (val) => val || "--",
            },
        ],
        []
    );

    return (
        <div className="rpt-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={PAGINATION}
            />
        </div>
    );
};

export default memo(AppointmentCancellationTable);
