import { memo, useEffect, useMemo, useState } from "react";
import { Switch } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 290, x: 1100 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="ms-col-title">{label}</span>;

const ProblemListTable = ({ data, loading }) => {
    const [activeMap, setActiveMap] = useState({});

    useEffect(() => {
        if (!Array.isArray(data)) return;
        setActiveMap((prev) => {
            const next = { ...prev };
            data.forEach((row) => {
                if (next[row.id] === undefined) next[row.id] = !!row.active;
            });
            return next;
        });
    }, [data]);

    const columns = useMemo(
        () => [
            {
                title: renderTitle("Problem List"),
                dataIndex: "code",
                width: 120,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Description"),
                dataIndex: "description",
                width: 320,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("SNOMED CT code"),
                dataIndex: "snomedCode",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("SNOMED Description"),
                dataIndex: "snomedDescription",
                render: (val) => val || "--",
            },
            {
                title: "",
                dataIndex: "active",
                width: 80,
                align: "right",
                render: (_, record) => (
                    <Switch
                        checked={!!activeMap[record.id]}
                        onChange={(checked) =>
                            setActiveMap((prev) => ({
                                ...prev,
                                [record.id]: checked,
                            }))
                        }
                    />
                ),
            },
        ],
        [activeMap]
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

export default memo(ProblemListTable);
