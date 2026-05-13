import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 460, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const AsamCountTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Client name"),
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
                title: renderTitle("Admission date"),
                dataIndex: "admissionDate",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("ASAM type"),
                dataIndex: "asamType",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("ASAM completion date"),
                dataIndex: "completionDate",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Days from admission to completion"),
                dataIndex: "daysToCompletion",
                width: 240,
                render: (val) =>
                    val === undefined || val === null ? "--" : `${val} days`,
            },
            {
                title: renderTitle("On-time status"),
                dataIndex: "onTime",
                width: 140,
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

export default memo(AsamCountTable);
