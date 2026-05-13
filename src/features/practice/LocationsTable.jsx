import { memo, useCallback, useMemo, useState } from "react";
import { Button, Dropdown, Switch } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import CustomTable from "../../components/common/CustomTable";

const ROW_ACTION_ITEMS = [
    { key: "edit", label: "Edit" },
    { key: "duplicate", label: "Duplicate" },
    { key: "remove", label: "Remove" },
];

const renderRowAction = (onAction) => (_, record) => (
    <Dropdown
        menu={{
            items: ROW_ACTION_ITEMS,
            onClick: ({ key }) => onAction?.(key, record),
        }}
        trigger={["click"]}
        placement="bottomRight"
    >
        <Button
            type="text"
            icon={<MoreOutlined />}
            className="prac-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

const LOCATION_PAGINATION = {
    pageSize: 15,
    pageSizeOptions: [10, 15, 20],
};

const TABLE_SCROLL = { y: 360, x: 900 };

const LocationsTable = ({ data, loading }) => {
    const [statusOverrides, setStatusOverrides] = useState({});

    const handleRowAction = useCallback((key, record) => {
        // console.log("Location action", key, record);
    }, []);

    const handleStatusToggle = useCallback((id, checked) => {
        setStatusOverrides((prev) => ({
            ...prev,
            [id]: checked ? "Active" : "Inactive",
        }));
    }, []);

    const renderStatus = useCallback(
        (val, record) => {
            const current = statusOverrides[record.id] ?? val;
            const isActive = current === "Active";
            return (
                <span className="prac-status-cell">
                    <Switch
                        checked={isActive}
                        onChange={(checked) =>
                            handleStatusToggle(record.id, checked)
                        }
                        size="small"
                    />
                    <span
                        className={`prac-status-label ${
                            isActive
                                ? "prac-status-active"
                                : "prac-status-inactive"
                        }`}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </span>
            );
        },
        [statusOverrides, handleStatusToggle]
    );

    const columns = useMemo(
        () => [
            {
                title: "Location ID",
                dataIndex: "locationId",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: "Location Name",
                dataIndex: "locationName",
                width: 170,
                render: (val) => (
                    <span className="prac-location-name">{val}</span>
                ),
            },
            {
                title: "Address",
                dataIndex: "address",
                width: 320,
                render: (val) => val || "--",
            },
            {
                title: "Contact Number",
                dataIndex: "contactNumber",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: "Status",
                dataIndex: "status",
                width: 130,
                render: renderStatus,
            },
            {
                title: "Action",
                key: "action",
                width: 70,
                align: "center",
                render: renderRowAction(handleRowAction),
            },
        ],
        [renderStatus, handleRowAction]
    );

    return (
        <div className="prac-locations-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={LOCATION_PAGINATION}
            />
        </div>
    );
};

export default memo(LocationsTable);
