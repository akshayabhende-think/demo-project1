import { memo, useCallback, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildReceiptColumns } from "./billingColumns";
import {
    BILLING_DEFAULT_PAGE_SIZE,
    BILLING_PAGE_SIZE_OPTIONS,
} from "./constants";

const TABLE_SCROLL = { y: 400, x: 1100 };

const ReceiptsTable = ({ data, loading }) => {
    const handleRowAction = useCallback((key, record) => {
        console.log("Receipt action", key, record);
    }, []);

    const columns = useMemo(
        () => buildReceiptColumns({ onAction: handleRowAction }),
        [handleRowAction]
    );

    const pagination = useMemo(
        () => ({
            pageSize: BILLING_DEFAULT_PAGE_SIZE,
            pageSizeOptions: BILLING_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="bill-table bill-receipts-table">
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

export default memo(ReceiptsTable);
