import { memo, useMemo, useState } from "react";
import CustomTable from "../../components/common/CustomTable";
import { buildAppointmentColumns } from "./appointmentColumns";

const TABS = [
    { key: "all", label: "Appointments" },
    { key: "unsigned", label: "Unsigned Appointments" },
];

const TABLE_SCROLL = { y: 460, x: false };

const SchedulingListView = ({ data, loading, onAppointmentClick }) => {
    const [tab, setTab] = useState("all");

    const filtered = useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (tab === "unsigned") return data.filter((a) => !a.isSigned);
        return data;
    }, [data, tab]);

    const columns = useMemo(
        () => buildAppointmentColumns({ onStart: onAppointmentClick }),
        [onAppointmentClick]
    );

    return (
        <div className="scheduling-list">
            <div className="scheduling-list-tabs" role="tablist">
                {TABS.map(({ key, label }) => {
                    const isActive = tab === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`scheduling-list-tab ${
                                isActive ? "is-active" : ""
                            }`}
                            onClick={() => setTab(key)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            <div className="scheduling-list-table">
                <CustomTable
                    columns={columns}
                    data={filtered}
                    loading={loading}
                    scroll={TABLE_SCROLL}
                />
            </div>
        </div>
    );
};

export default memo(SchedulingListView);
