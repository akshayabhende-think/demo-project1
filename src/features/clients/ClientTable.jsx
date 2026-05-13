import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildClientColumns } from "./clientColumns";
import {
    CLIENT_DEFAULT_PAGE_SIZE,
    CLIENT_PAGE_SIZE_OPTIONS,
} from "./constants";
import "../../styles/client/clientTable.css";

// const TABLE_SCROLL = { y: 420, x: false };

const ClientTable = ({ data, loading }) => {
    const columns = useMemo(() => buildClientColumns(), []);

    const pagination = useMemo(
        () => ({
            pageSize: CLIENT_DEFAULT_PAGE_SIZE,
            pageSizeOptions: CLIENT_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="client-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={{ y: 400, x: 1100 }}
                pagination={pagination}
            />
        </div>
    );
};

export default memo(ClientTable);
