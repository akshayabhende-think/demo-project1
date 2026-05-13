import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/common/CustomTable";
import AddInvoiceModal from "./AddInvoiceModal";
import { buildEncounterColumns } from "./billingColumns";
import {
    BILLING_DEFAULT_PAGE_SIZE,
    BILLING_PAGE_SIZE_OPTIONS,
} from "./constants";

const TABLE_SCROLL = { y: 350, x: 1100 };

const BillingTable = ({ data, loading, subTab = "billable" }) => {
    const navigate = useNavigate();
    const [invoiceTarget, setInvoiceTarget] = useState(null);

    const handleRowAction = useCallback(
        (key, record) => {
            if (key === "generateSuperbill") {
                navigate(`/billing/superbill/${record.id}`);
                return;
            }
            if (key === "generateInvoice") {
                setInvoiceTarget(record);
                return;
            }
            // console.log("Encounter action", key, record);
        },
        [navigate]
    );

    const columns = useMemo(() => {
        const all = buildEncounterColumns({
            onAction: handleRowAction,
            subTab,
        });
        if (subTab === "nonBillable") {
            return all.filter((col) => col.dataIndex !== "status");
        }
        return all;
    }, [handleRowAction, subTab]);

    const pagination = useMemo(
        () => ({
            pageSize: BILLING_DEFAULT_PAGE_SIZE,
            pageSizeOptions: BILLING_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="bill-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={pagination}
            />
            <AddInvoiceModal
                open={Boolean(invoiceTarget)}
                onClose={() => setInvoiceTarget(null)}
                encounter={invoiceTarget}
            />
        </div>
    );
};

export default memo(BillingTable);
