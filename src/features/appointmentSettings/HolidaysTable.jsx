import { memo, useCallback, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildHolidayColumns } from "./holidayColumns";
import {
    APPT_DEFAULT_PAGE_SIZE,
    APPT_PAGE_SIZE_OPTIONS,
} from "./constants";

const TABLE_SCROLL = { y: 345, x: 900 };

const HolidaysTable = ({ data, loading }) => {
    const handleEdit = useCallback((record) => {
        console.log("Edit holiday", record);
    }, []);

    const columns = useMemo(
        () => buildHolidayColumns({ onEdit: handleEdit }),
        [handleEdit]
    );

    const pagination = useMemo(
        () => ({
            pageSize: APPT_DEFAULT_PAGE_SIZE,
            pageSizeOptions: APPT_PAGE_SIZE_OPTIONS,
        }),
        []
    );

    return (
        <div className="appt-table">
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

export default memo(HolidaysTable);
