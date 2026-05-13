import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1300 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const OverdueAsamTable = ({ data, loading }) => {
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
                title: renderTitle("Admission date"),
                dataIndex: "admissionDate",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Days since admission"),
                dataIndex: "daysSinceAdmission",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("ASAM due date"),
                dataIndex: "asamDueDate",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Days overdue"),
                dataIndex: "daysOverdue",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("ASAM status"),
                dataIndex: "asamStatus",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Assigned to"),
                dataIndex: "assignedTo",
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

export default memo(OverdueAsamTable);
