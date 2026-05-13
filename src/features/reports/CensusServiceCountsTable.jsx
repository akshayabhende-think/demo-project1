import { memo, useMemo } from "react";
import { Tag } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 420, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const CensusServiceCountsTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Individual counseling sessions count"),
                dataIndex: "individualCount",
                width: 240,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("Group therapy sessions count"),
                dataIndex: "groupCount",
                width: 220,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("Case management contacts count"),
                dataIndex: "caseMgmtCount",
                width: 240,
                render: (val) => (val ?? "--"),
            },
            {
                title: renderTitle("Assessments completed"),
                dataIndex: "assessmentsCompleted",
                width: 200,
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
                title: renderTitle("Crisis interventions"),
                dataIndex: "crisisInterventions",
                width: 200,
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

export default memo(CensusServiceCountsTable);
