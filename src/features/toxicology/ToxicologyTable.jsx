import { memo, useCallback, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";
import {
    buildToxicologyColumns,
    buildExceptionsColumns,
    buildShipmentsColumns,
    buildPendingResultsColumns,
    buildResultsColumns,
} from "./toxicologyColumns";
import {
    TOX_DEFAULT_PAGE_SIZE,
    TOX_PAGE_SIZE_OPTIONS,
} from "./constants";
import "../../styles/toxicology/toxicologyTable.css";

const TABLE_SCROLL = { y: 400, x: 1100 };

const ToxicologyTable = ({ data, loading, activeTab = "active" }) => {
    const handlePrintLabel = useCallback((record) => {
        console.log("Print label", record);
    }, []);

    const handleCollect = useCallback((record) => {
        console.log("Collect sample", record);
    }, []);

    const handlePendingAction = useCallback((key, record) => {
        console.log("Pending action", key, record);
    }, []);

    const handleViewResult = useCallback((record) => {
        console.log("View result", record);
    }, []);

    const columns = useMemo(() => {
        if (activeTab === "exceptions") {
            return buildExceptionsColumns();
        }
        if (activeTab === "shipping") {
            return buildShipmentsColumns();
        }
        if (activeTab === "pendingResults" || activeTab === "rejected") {
            return buildPendingResultsColumns({ onAction: handlePendingAction });
        }
        if (activeTab === "results") {
            return buildResultsColumns({ onView: handleViewResult });
        }
        return buildToxicologyColumns({
            onPrintLabel: handlePrintLabel,
            onCollect: handleCollect,
        });
    }, [activeTab, handlePrintLabel, handleCollect, handlePendingAction, handleViewResult]);

    const pagination = useMemo(
        () => ({
            pageSize: TOX_DEFAULT_PAGE_SIZE,
            pageSizeOptions: TOX_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="tox-table">
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

export default memo(ToxicologyTable);
