import { memo, useMemo } from "react";
import { Tag } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 360, x: 1200 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const MODE_CLASS = {
    "In-person": "rpt-mode-inperson",
    Virtual: "rpt-mode-virtual",
};

const ATTENDANCE_CLASS = {
    Show: "rpt-attendance-show",
    "No-Show": "rpt-attendance-noshow",
    Cancel: "rpt-attendance-cancel",
};

const StaffSessionsTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Client name"),
                dataIndex: "clientName",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Appointment type"),
                dataIndex: "appointmentType",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Group name"),
                dataIndex: "groupName",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Mode of delivery"),
                dataIndex: "modeOfDelivery",
                width: 160,
                align: "center",
                render: (val) => (
                    <Tag className={`rpt-pill ${MODE_CLASS[val] || ""}`}>
                        {val || "--"}
                    </Tag>
                ),
            },
            {
                title: renderTitle("Scheduled start time"),
                dataIndex: "scheduledStart",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Total duration"),
                dataIndex: "totalDuration",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Billable status"),
                dataIndex: "billable",
                width: 140,
                align: "center",
                render: (val) => (
                    <Tag
                        className={`rpt-pill ${
                            val === "Yes" ? "rpt-pill-yes" : "rpt-pill-no"
                        }`}
                    >
                        {val || "--"}
                    </Tag>
                ),
            },
            {
                title: renderTitle("Attendance"),
                dataIndex: "attendance",
                width: 130,
                align: "center",
                render: (val) => (
                    <Tag className={`rpt-pill ${ATTENDANCE_CLASS[val] || ""}`}>
                        {val || "--"}
                    </Tag>
                ),
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

export default memo(StaffSessionsTable);
