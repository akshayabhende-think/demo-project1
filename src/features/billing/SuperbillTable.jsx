import { memo, useCallback, useMemo, useState } from "react";
import CustomTable from "../../components/common/CustomTable";
import GenerateCms1500Modal from "./GenerateCms1500Modal";
import AddPaymentModal from "./AddPaymentModal";
import { buildSuperbillColumns } from "./billingColumns";
import {
    BILLING_DEFAULT_PAGE_SIZE,
    BILLING_PAGE_SIZE_OPTIONS,
} from "./constants";

const TABLE_SCROLL = { y: 400, x: 1100 };

const SuperbillTable = ({ data, loading }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [cmsTarget, setCmsTarget] = useState(null);
    const [paymentTarget, setPaymentTarget] = useState(null);

    const handleRowAction = useCallback((key, record) => {
        if (key === "generateCms1500") {
            setCmsTarget(record);
            return;
        }
        if (key === "addPayment") {
            setPaymentTarget(record);
            return;
        }
        console.log("Superbill action", key, record);
    }, []);

    const columns = useMemo(
        () => buildSuperbillColumns({ onAction: handleRowAction }),
        [handleRowAction]
    );

    const rowSelection = useMemo(
        () => ({
            selectedRowKeys,
            onChange: setSelectedRowKeys,
        }),
        [selectedRowKeys]
    );

    const pagination = useMemo(
        () => ({
            pageSize: BILLING_DEFAULT_PAGE_SIZE,
            pageSizeOptions: BILLING_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="bill-table bill-superbill-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={pagination}
                rowSelection={rowSelection}
            />
            <GenerateCms1500Modal
                open={Boolean(cmsTarget)}
                onClose={() => setCmsTarget(null)}
                record={cmsTarget}
            />
            <AddPaymentModal
                open={Boolean(paymentTarget)}
                onClose={() => setPaymentTarget(null)}
                record={paymentTarget}
            />
        </div>
    );
};

export default memo(SuperbillTable);
