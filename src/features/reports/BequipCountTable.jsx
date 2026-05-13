import { memo, useMemo } from "react";
import { Tag } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const RISK_CLASS = {
    None: "rpt-risk-none",
    Low: "rpt-risk-low",
    Moderate: "rpt-risk-moderate",
    High: "rpt-risk-high",
};

const BequipCountTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("client name"),
                dataIndex: "clientName",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("client ID"),
                dataIndex: "clientId",
                width: 100,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Date BEQUIP administered"),
                dataIndex: "dateAdministered",
                width: 200,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Risk level (from BEQUIP)"),
                dataIndex: "riskLevel",
                width: 180,
                align: "center",
                render: (val) => (
                    <Tag className={`rpt-risk-tag ${RISK_CLASS[val] || ""}`}>
                        {val || "--"}
                    </Tag>
                ),
            },
            {
                title: renderTitle("Withdrawal risk level"),
                dataIndex: "withdrawalRiskLevel",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Readiness for change score"),
                dataIndex: "readinessScore",
                width: 200,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Primary Counselor"),
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

export default memo(BequipCountTable);
