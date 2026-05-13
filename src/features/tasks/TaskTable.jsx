import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildTaskColumns } from "./taskColumns";
import {
    TASK_DEFAULT_PAGE_SIZE,
    TASK_PAGE_SIZE_OPTIONS,
} from "./constants";
import "../../styles/task/taskTable.css";

const TABLE_SCROLL = { y: 400, x: 1100 };

const TABLE_LOCALE = {
    emptyText: (
        <div className="task-empty">No records found</div>
    ),
};

const TaskTable = ({ data, loading, onView, onEdit, activeTab }) => {
    const columns = useMemo(
        () => buildTaskColumns({ onView, onEdit, activeTab }),
        [onView, onEdit, activeTab]
    );

    const pagination = useMemo(
        () => ({
            pageSize: TASK_DEFAULT_PAGE_SIZE,
            pageSizeOptions: TASK_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="task-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={pagination}
                locale={TABLE_LOCALE}
            />
        </div>
    );
};

export default memo(TaskTable);
