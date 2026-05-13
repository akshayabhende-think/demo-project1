import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildGroupColumns } from "./groupColumns";
import {
    GROUP_DEFAULT_PAGE_SIZE,
    GROUP_PAGE_SIZE_OPTIONS,
} from "./constants";
import "../../styles/group/groupTable.css";

const TABLE_SCROLL = { y: 400, x: 1100 };

const GroupTable = ({ data, loading, onView, onEdit }) => {
    const columns = useMemo(
        () => buildGroupColumns({ onView, onEdit }),
        [onView, onEdit]
    );

    const pagination = useMemo(
        () => ({
            pageSize: GROUP_DEFAULT_PAGE_SIZE,
            pageSizeOptions: GROUP_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="group-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={pagination}
            />
        </div>
    );
};

export default memo(GroupTable);
