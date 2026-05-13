import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 420, x: false };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const CensusLevelOfCareTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Count of clients at each level"),
                dataIndex: "level",
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

export default memo(CensusLevelOfCareTable);
