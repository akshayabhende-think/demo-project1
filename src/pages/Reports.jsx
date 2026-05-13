import { useMemo, useState } from "react";
import { Alert, Button } from "antd";
import { ArrowLeftOutlined, DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { REPORT_TABS } from "../features/reports/reportsConfig";
import BequipCountTable from "../features/reports/BequipCountTable";
import AsamCountTable from "../features/reports/AsamCountTable";
import MonthlyCensusView from "../features/reports/MonthlyCensusView";
import OverdueAsamTable from "../features/reports/OverdueAsamTable";
import InactiveClientsTable from "../features/reports/InactiveClientsTable";
import StaffProductivityView from "../features/reports/StaffProductivityView";
import BillingReportTable from "../features/reports/BillingReportTable";
import NoShowTable from "../features/reports/NoShowTable";
import AppointmentCancellationTable from "../features/reports/AppointmentCancellationTable";
import BillingProgramReportTable from "../features/reports/BillingProgramReportTable";
import ApplyFilterModal from "../features/reports/ApplyFilterModal";
import { useBequipCount } from "../hooks/useBequipCount";
import { useAsamCount } from "../hooks/useAsamCount";
import { useOverdueAsam } from "../hooks/useOverdueAsam";
import { useInactiveClients } from "../hooks/useInactiveClients";
import { useBillingReport } from "../hooks/useBillingReport";
import { useNoShow } from "../hooks/useNoShow";
import { useAppointmentCancellation } from "../hooks/useAppointmentCancellation";
import { useBillingProgramReport } from "../hooks/useBillingProgramReport";
import "../styles/reports/reports.css";

dayjs.extend(customParseFormat);

const EMPTY_FILTERS = {
    dateRange: null,
    counselor: undefined,
    program: undefined,
    riskLevel: undefined,
};

const uniqueValues = (rows, key) => {
    const set = new Set();
    rows.forEach((r) => {
        if (r?.[key]) set.add(r[key]);
    });
    return Array.from(set).sort();
};

const Reports = () => {
    const [activeTab, setActiveTab] = useState("bequipCount");
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const isBequip = activeTab === "bequipCount";
    const isAsam = activeTab === "asamCount";
    const isMonthlyCensus = activeTab === "monthlyProgramCensus";
    const isOverdueAsam = activeTab === "overdueAsam";
    const isInactiveClients = activeTab === "inactiveClients";
    const isStaffProductivity = activeTab === "staffProductivity";
    const isBilling = activeTab === "billing";
    const isNoShow = activeTab === "noShow";
    const isAppointmentCancellation = activeTab === "appointmentCancellation";
    const isBillingProgramReport = activeTab === "billingProgramReport";

    const bequipQuery = useBequipCount(isBequip);
    const asamQuery = useAsamCount(isAsam);
    const overdueAsamQuery = useOverdueAsam(isOverdueAsam);
    const inactiveClientsQuery = useInactiveClients(isInactiveClients);
    const billingQuery = useBillingReport(isBilling);
    const noShowQuery = useNoShow(isNoShow);
    const appointmentCancellationQuery = useAppointmentCancellation(isAppointmentCancellation);
    const billingProgramReportQuery = useBillingProgramReport(isBillingProgramReport);
    const bequipData = useMemo(
        () => (Array.isArray(bequipQuery.data) ? bequipQuery.data : []),
        [bequipQuery.data]
    );
    const asamData = useMemo(
        () => (Array.isArray(asamQuery.data) ? asamQuery.data : []),
        [asamQuery.data]
    );

    const counselorOptions = useMemo(
        () => uniqueValues(bequipData, "primaryCounselor"),
        [bequipData]
    );
    const programOptions = useMemo(
        () => uniqueValues(bequipData, "program"),
        [bequipData]
    );

    const filteredBequip = useMemo(() => {
        return bequipData.filter((row) => {
            if (filters.counselor && row.primaryCounselor !== filters.counselor) return false;
            if (filters.program && row.program !== filters.program) return false;
            if (filters.riskLevel && row.riskLevel !== filters.riskLevel) return false;
            if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
                const rowDate = dayjs(row.dateAdministered, "DD/MM/YYYY");
                if (!rowDate.isValid()) return true;
                const [start, end] = filters.dateRange;
                if (rowDate.isBefore(start, "day") || rowDate.isAfter(end, "day")) return false;
            }
            return true;
        });
    }, [bequipData, filters]);

    const activeLabel =
        REPORT_TABS.find((t) => t.key === activeTab)?.label ?? "";

    const handleTabChange = (key) => {
        setActiveTab(key);
        setFilters(EMPTY_FILTERS);
        setSelectedStaff(null);
    };

    return (
        <div className="rpt-page">
            <aside className="rpt-sidebar">
                <ul className="rpt-sidebar-list">
                    {REPORT_TABS.map(({ key, label }) => {
                        const isActive = activeTab === key;
                        return (
                            <li key={key}>
                                <button
                                    type="button"
                                    className={`rpt-sidebar-item ${
                                        isActive ? "is-active" : ""
                                    }`}
                                    onClick={() => handleTabChange(key)}
                                    style={{justifyContent:"flex-start"}}
                                >
                                    <span className="rpt-sidebar-dot" />
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <section className="rpt-main">
                <div className="rpt-header">
                    <div className="rpt-title-wrap">
                        {isStaffProductivity && selectedStaff && (
                            <button
                                type="button"
                                className="rpt-back-btn"
                                onClick={() => setSelectedStaff(null)}
                                aria-label="Back"
                            >
                                <ArrowLeftOutlined />
                            </button>
                        )}
                        <span className="rpt-title">{activeLabel}</span>
                        {isStaffProductivity && selectedStaff && (
                            <span className="rpt-staff-badge">{selectedStaff}</span>
                        )}
                    </div>
                    <div className="rpt-header-actions">
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            className="rpt-export-btn"
                            onClick={() => { /* console.log("Export", activeTab) */ }}
                        >
                            Export
                        </Button>
                        <button
                            type="button"
                            className="rpt-filter-btn"
                            aria-label="Filter"
                            onClick={() => setFilterOpen(true)}
                            style={{ justifyContent: "center" }}
                        >
                            <FilterOutlined />
                        </button>
                    </div>
                </div>

                <div className="rpt-card">
                    {isBequip ? (
                        bequipQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={bequipQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => bequipQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <BequipCountTable
                                data={filteredBequip}
                                loading={bequipQuery.isLoading}
                            />
                        )
                    ) : isAsam ? (
                        asamQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={asamQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => asamQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <AsamCountTable
                                data={asamData}
                                loading={asamQuery.isLoading}
                            />
                        )
                    ) : isMonthlyCensus ? (
                        <MonthlyCensusView />
                    ) : isOverdueAsam ? (
                        overdueAsamQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={overdueAsamQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => overdueAsamQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <OverdueAsamTable
                                data={
                                    Array.isArray(overdueAsamQuery.data)
                                        ? overdueAsamQuery.data
                                        : []
                                }
                                loading={overdueAsamQuery.isLoading}
                            />
                        )
                    ) : isInactiveClients ? (
                        inactiveClientsQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={inactiveClientsQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => inactiveClientsQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <InactiveClientsTable
                                data={
                                    Array.isArray(inactiveClientsQuery.data)
                                        ? inactiveClientsQuery.data
                                        : []
                                }
                                loading={inactiveClientsQuery.isLoading}
                            />
                        )
                    ) : isStaffProductivity ? (
                        <StaffProductivityView
                            selectedStaff={selectedStaff}
                            onSelectStaff={setSelectedStaff}
                        />
                    ) : isBilling ? (
                        billingQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={billingQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => billingQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <BillingReportTable
                                data={
                                    Array.isArray(billingQuery.data)
                                        ? billingQuery.data
                                        : []
                                }
                                loading={billingQuery.isLoading}
                            />
                        )
                    ) : isNoShow ? (
                        noShowQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={noShowQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => noShowQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <NoShowTable
                                data={
                                    Array.isArray(noShowQuery.data)
                                        ? noShowQuery.data
                                        : []
                                }
                                loading={noShowQuery.isLoading}
                            />
                        )
                    ) : isAppointmentCancellation ? (
                        appointmentCancellationQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={appointmentCancellationQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => appointmentCancellationQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <AppointmentCancellationTable
                                data={
                                    Array.isArray(appointmentCancellationQuery.data)
                                        ? appointmentCancellationQuery.data
                                        : []
                                }
                                loading={appointmentCancellationQuery.isLoading}
                            />
                        )
                    ) : isBillingProgramReport ? (
                        billingProgramReportQuery.isError ? (
                            <Alert
                                type="error"
                                message="Failed to load report"
                                description={billingProgramReportQuery.error?.message}
                                action={
                                    <button
                                        onClick={() => billingProgramReportQuery.refetch()}
                                        className="rpt-retry-btn"
                                    >
                                        Retry
                                    </button>
                                }
                            />
                        ) : (
                            <BillingProgramReportTable
                                data={
                                    Array.isArray(billingProgramReportQuery.data)
                                        ? billingProgramReportQuery.data
                                        : []
                                }
                                loading={billingProgramReportQuery.isLoading}
                            />
                        )
                    ) : (
                        <div className="rpt-placeholder">
                            {activeLabel} report — coming soon.
                        </div>
                    )}
                </div>
            </section>

            <ApplyFilterModal
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                onApply={setFilters}
                initial={filters}
                counselorOptions={counselorOptions}
                programOptions={programOptions}
            />
        </div>
    );
};

export default Reports;
