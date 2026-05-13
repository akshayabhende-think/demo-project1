import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1200 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const NoShowTable = ({ data, loading }) => {
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
                title: renderTitle("Group name"),
                dataIndex: "groupName",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Scheduled start time"),
                dataIndex: "scheduledStart",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Primary counselor"),
                dataIndex: "primaryCounselor",
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

export default memo(NoShowTable);
