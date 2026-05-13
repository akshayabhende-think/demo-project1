import { memo, useCallback, useMemo, useState } from "react";
import CustomTable from "../../components/common/CustomTable";
import AddPaymentModal from "./AddPaymentModal";
import { buildInvoiceColumns } from "./billingColumns";
import {
    BILLING_DEFAULT_PAGE_SIZE,
    BILLING_PAGE_SIZE_OPTIONS,
} from "./constants";

const TABLE_SCROLL = { y: 400, x: 1100 };

const InvoicesTable = ({ data, loading }) => {
    const [paymentTarget, setPaymentTarget] = useState(null);

    const handleAddPayment = useCallback((record) => {
        setPaymentTarget(record);
    }, []);

    const handleMenuAction = useCallback((key, record) => {
        // console.log("Invoice action", key, record);
    }, []);

    const columns = useMemo(
        () =>
            buildInvoiceColumns({
                onAddPayment: handleAddPayment,
                onMenuAction: handleMenuAction,
            }),
        [handleAddPayment, handleMenuAction]
    );

    const pagination = useMemo(
        () => ({
            pageSize: BILLING_DEFAULT_PAGE_SIZE,
            pageSizeOptions: BILLING_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="bill-table bill-invoices-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={pagination}
            />
            <AddPaymentModal
                open={Boolean(paymentTarget)}
                onClose={() => setPaymentTarget(null)}
                record={paymentTarget}
            />
        </div>
    );
};

export default memo(InvoicesTable);
