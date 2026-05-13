import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 290, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="ms-col-title">{label}</span>;

const CptCodesTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("ID"),
                dataIndex: "code",
                width: 110,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Provider Type"),
                dataIndex: "providerType",
                width: 220,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Provider Name"),
                dataIndex: "providerName",
                width: 200,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Speciality"),
                dataIndex: "speciality",
                width: 220,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("NPI Number"),
                dataIndex: "npiNumber",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Email ID"),
                dataIndex: "emailId",
                width: 240,
                render: (val) => val || "--",
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

export default memo(CptCodesTable);
