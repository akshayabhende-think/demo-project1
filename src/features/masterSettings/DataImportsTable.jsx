import { memo, useMemo } from "react";
import { Tag } from "antd";
import CustomTable from "../../components/common/CustomTable";

const STATUS_CLASS = {
    Complete: "ms-status-complete",
    Failed: "ms-status-failed",
    Processing: "ms-status-processing",
};

const renderStatus = (val) => (
    <Tag className={`ms-status-tag ${STATUS_CLASS[val] ?? ""}`}>{val}</Tag>
);

const TABLE_SCROLL = { y: 280, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const DataImportsTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: "Import Initiated",
                dataIndex: "importInitiated",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: "Entity",
                dataIndex: "entity",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: "File Name",
                dataIndex: "fileName",
                width: 220,
                render: (val) => val || "--",
            },
            {
                title: "User Name",
                dataIndex: "userName",
                width: 200,
                render: (val) => val || "--",
            },
            {
                title: "Total Records",
                dataIndex: "totalRecords",
                width: 130,
                render: (val) => (val ?? "--"),
            },
            {
                title: "Status",
                dataIndex: "status",
                width: 130,
                render: renderStatus,
            },
        ],
        []
    );

    return (
        <div className="ms-table">
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

export default memo(DataImportsTable);
