import { memo, useMemo } from "react";
import { Tag, Dropdown, Popconfirm, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomTable from "../../components/common/CustomTable";
import { deleteFeeSchedule } from "../../api/feeScheduleApi";

const TABLE_SCROLL = { y: 420, x: false };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="fs-col-title">{label}</span>;

const STATUS_CLASS = {
    Active: "fs-status-active",
    Inactive: "fs-status-inactive",
};

const FeeActionCell = ({ record, onView, onDelete }) => {
    const items = [
        {
            key: "view",
            label: <span onClick={() => onView(record)}>View</span>,
        },
        {
            key: "delete",
            label: (
                <Popconfirm
                    title="Delete this fee schedule?"
                    okText="Delete"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true }}
                    onConfirm={() => onDelete(record)}
                >
                    <span className="fs-action-delete">Delete</span>
                </Popconfirm>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
        >
            <button
                type="button"
                className="fs-action-trigger"
                aria-label="Actions"
                onClick={(e) => e.stopPropagation()}
            >
                <MoreOutlined />
            </button>
        </Dropdown>
    );
};

const FeeScheduleTable = ({ data, loading }) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteFeeSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeSchedule"] });
            message.success("Fee schedule deleted");
        },
        onError: (err) => {
            message.error(err?.message || "Failed to delete fee schedule");
        },
    });

    const handleView = (record) => {
        console.log("View fee schedule", record);
    };

    const handleDelete = (record) => {
        deleteMutation.mutate(record.id);
    };

    const columns = useMemo(
        () => [
            {
                title: renderTitle("Procedure Code"),
                dataIndex: "procedureCode",
                width: 320,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Provider"),
                dataIndex: "provider",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Payer Name"),
                dataIndex: "payerName",
                width: 220,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Start Date"),
                dataIndex: "startDate",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("End Date"),
                dataIndex: "endDate",
                width: 130,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Status"),
                dataIndex: "status",
                width: 110,
                render: (val) => (
                    <Tag className={`fs-status-tag ${STATUS_CLASS[val] || ""}`}>
                        {val || "--"}
                    </Tag>
                ),
            },
            {
                title: renderTitle("Action"),
                dataIndex: "action",
                width: 80,
                align: "center",
                render: (_, record) => (
                    <FeeActionCell
                        record={record}
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <div className="fs-table">
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

export default memo(FeeScheduleTable);
