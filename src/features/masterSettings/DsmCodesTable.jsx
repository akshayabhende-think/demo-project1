import { memo, useEffect, useMemo, useState } from "react";
import { Switch } from "antd";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 290, x: 700 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="ms-col-title">{label}</span>;

const DsmCodesTable = ({ data, loading }) => {
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
                title: renderTitle("DSM Codes"),
                dataIndex: "code",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Description"),
                dataIndex: "description",
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

export default memo(DsmCodesTable);
