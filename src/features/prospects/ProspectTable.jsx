import { memo, useMemo, useState } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildProspectColumns } from "./prospectColumns";
import {
    DEFAULT_PAGE_SIZE,
    PAGE_SIZE_OPTIONS,
} from "./constants";
import "../../styles/prospect/prospectTable.css";

const TABLE_SCROLL = { y: 290, x: 1100 };

const ProspectTable = ({
    data,
    loading,
    onView,
    onEdit,
    onArchive,
    onUnarchive,
    activeTab,
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = useMemo(
        () =>
            buildProspectColumns({
                onView,
                onEdit,
                onArchive,
                onUnarchive,
                activeTab,
            }),
        [onView, onEdit, onArchive, onUnarchive, activeTab]
    );

    const rowSelection = useMemo(
        () => ({ selectedRowKeys, onChange: setSelectedRowKeys }),
        [selectedRowKeys]
    );

    const pagination = useMemo(
        () => ({
            pageSize: DEFAULT_PAGE_SIZE,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="prospect-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                rowSelection={rowSelection}
                pagination={pagination}
            />
        </div>
    );
};

export default memo(ProspectTable);
