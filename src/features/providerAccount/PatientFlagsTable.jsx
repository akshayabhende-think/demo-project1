import { memo, useCallback, useMemo } from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import CustomTable from "../../components/common/CustomTable";

const ROW_ACTION_ITEMS = [
    { key: "edit", label: "Edit" },
    { key: "remove", label: "Remove" },
];

const renderColorSwatch = (color) => (
    <span
        className="pa-flag-swatch"
        style={{ background: color || "#e5e7eb" }}
    />
);

const renderFlagCount = (val) =>
    typeof val === "number" ? String(val).padStart(2, "0") : val ?? "--";

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
            className="pa-row-action-btn"
            aria-label="Row actions"
        />
    </Dropdown>
);

const PATIENT_FLAG_PAGINATION = {
    pageSize: 15,
    pageSizeOptions: [10, 15, 20],
};

const TABLE_SCROLL = { y: 380, x: 900 };

const PatientFlagsTable = ({ data, loading }) => {
    const handleRowAction = useCallback((key, record) => {
        console.log("Patient flag action", key, record);
    }, []);

    const columns = useMemo(
        () => [
            {
                title: "Flag Name",
                dataIndex: "name",
                width: 220,
                render: (val) => val || "--",
            },
            {
                title: "Color",
                dataIndex: "color",
                width: 140,
                render: renderColorSwatch,
            },
            {
                title: "Flags",
                dataIndex: "flags",
                width: 130,
                render: renderFlagCount,
            },
            {
                title: "Updated Date",
                dataIndex: "updatedDate",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: "Created Date",
                dataIndex: "createdDate",
                width: 170,
                render: (val) => val || "--",
            },
            {
                title: "Action",
                key: "action",
                width: 80,
                align: "center",
                render: renderRowAction(handleRowAction),
            },
        ],
        [handleRowAction]
    );

    return (
        <div className="pa-flags-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={PATIENT_FLAG_PAGINATION}
            />
        </div>
    );
};

export default memo(PatientFlagsTable);
