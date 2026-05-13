import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1300 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const InactiveClientsTable = ({ data, loading }) => {
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
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Admission date"),
                dataIndex: "admissionDate",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Last service date"),
                dataIndex: "lastServiceDate",
                width: 150,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Days since last service"),
                dataIndex: "daysSinceLastService",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Last service type"),
                dataIndex: "lastServiceType",
                width: 170,
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

export default memo(InactiveClientsTable);
