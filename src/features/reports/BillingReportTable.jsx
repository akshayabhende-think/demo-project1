import { memo, useMemo } from "react";
import { Tag } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1300 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const MODE_CLASS = {
    "In-person": "rpt-mode-inperson",
    Virtual: "rpt-mode-virtual",
};

const BillingReportTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Client name"),
                dataIndex: "clientName",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Client ID"),
                dataIndex: "clientId",
                width: 110,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Service date"),
                dataIndex: "serviceDate",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Appointment type"),
                dataIndex: "appointmentType",
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
                width: 110,
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
                title: renderTitle("Assigned counselor"),
                dataIndex: "assignedCounselor",
                width: 180,
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

export default memo(BillingReportTable);
