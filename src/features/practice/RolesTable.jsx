import { memo, useCallback, useMemo } from "react";
import { Button, Dropdown, Tag } from "antd";
import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import CustomTable from "../../components/common/CustomTable";

const ROLE_TYPE_CLASS = {
    Receptionist: "uc-role-receptionist",
    LPHA: "uc-role-lpha",
    Counsellor: "uc-role-counsellor",
    Admin: "uc-role-admin",
};

const ROW_ACTION_ITEMS = [
    { key: "edit", label: "Edit", icon: <EditOutlined /> },
    {
        key: "delete",
        label: "Delete",
        icon: <DeleteOutlined />,
        danger: true,
    },
];

const renderRoleType = (val) => (
    <Tag className={`uc-role ${ROLE_TYPE_CLASS[val] ?? ""}`}>{val}</Tag>
);

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

const ROLES_PAGINATION = {
    pageSize: 15,
    pageSizeOptions: [10, 15, 20],
};

const TABLE_SCROLL = { y: 380, x: 900 };

const RolesTable = ({ data, loading }) => {
    const handleRowAction = useCallback((key, record) => {
        console.log("Role action", key, record);
    }, []);

    const columns = useMemo(
        () => [
            {
                title: "Role Type",
                dataIndex: "roleType",
                width: 140,
                render: renderRoleType,
            },
            {
                title: "Role",
                dataIndex: "role",
                width: 220,
                render: (val) => (
                    <span className="prac-location-name">{val}</span>
                ),
            },
            {
                title: "Description",
                dataIndex: "description",
                width: 480,
                render: (val) => val || "--",
            },
            {
                title: "Action",
                key: "action",
                width: 70,
                align: "center",
                render: renderRowAction(handleRowAction),
            },
        ],
        [handleRowAction]
    );

    return (
        <div className="prac-locations-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={ROLES_PAGINATION}
            />
        </div>
    );
};

export default memo(RolesTable);
