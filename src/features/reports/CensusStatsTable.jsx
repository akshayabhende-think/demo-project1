import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 420, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const CensusStatsTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Total active clients"),
                dataIndex: "totalActiveClients",
                width: 180,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("New admissions this month"),
                dataIndex: "newAdmissions",
                width: 220,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("Successful discharges this month"),
                dataIndex: "successfulDischarges",
                width: 240,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("Unsuccessful/administrative discharges this month"),
                dataIndex: "unsuccessfulDischarges",
                width: 320,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("Average daily attendance"),
                dataIndex: "averageDailyAttendance",
                width: 200,
                render: (val) => (val ?? "--"),
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

export default memo(CensusStatsTable);
