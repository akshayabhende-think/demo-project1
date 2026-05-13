import { useState } from "react";
import { Alert } from "antd";
import CensusDemographicsTable from "./CensusDemographicsTable";
import CensusServiceCountsTable from "./CensusServiceCountsTable";
import CensusStatsTable from "./CensusStatsTable";
import CensusLevelOfCareTable from "./CensusLevelOfCareTable";
import { useCensusDemographics } from "../../hooks/useCensusDemographics";
import { useCensusServiceCounts } from "../../hooks/useCensusServiceCounts";
import { useCensusStats } from "../../hooks/useCensusStats";
import { useCensusLevelOfCare } from "../../hooks/useCensusLevelOfCare";

const SUB_TABS = [
    { key: "demographics", label: "Demographics tab" },
    { key: "serviceCounts", label: "Service counts" },
    { key: "census", label: "Census tab" },
    { key: "levelOfCare", label: "Level of care" },
];

const MonthlyCensusView = () => {
    const [subTab, setSubTab] = useState("demographics");
    const isDemographics = subTab === "demographics";
    const isServiceCounts = subTab === "serviceCounts";
    const isCensus = subTab === "census";
    const isLevelOfCare = subTab === "levelOfCare";

    const demographicsQuery = useCensusDemographics(isDemographics);
    const serviceCountsQuery = useCensusServiceCounts(isServiceCounts);
    const censusStatsQuery = useCensusStats(isCensus);
    const levelOfCareQuery = useCensusLevelOfCare(isLevelOfCare);

    return (
        <div className="rpt-subview">
            <div className="rpt-subtabs" role="tablist">
                {SUB_TABS.map(({ key, label }) => {
                    const isActive = subTab === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`rpt-subtab ${isActive ? "is-active" : ""}`}
                            onClick={() => setSubTab(key)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            <div className="rpt-subview-body">
                {isDemographics ? (
                    demographicsQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load report"
                            description={demographicsQuery.error?.message}
                            action={
                                <button
                                    onClick={() => demographicsQuery.refetch()}
                                    className="rpt-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <CensusDemographicsTable
                            data={
                                Array.isArray(demographicsQuery.data)
                                    ? demographicsQuery.data
                                    : []
                            }
                            loading={demographicsQuery.isLoading}
                        />
                    )
                ) : isServiceCounts ? (
                    serviceCountsQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load report"
                            description={serviceCountsQuery.error?.message}
                            action={
                                <button
                                    onClick={() => serviceCountsQuery.refetch()}
                                    className="rpt-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <CensusServiceCountsTable
                            data={
                                Array.isArray(serviceCountsQuery.data)
                                    ? serviceCountsQuery.data
                                    : []
                            }
                            loading={serviceCountsQuery.isLoading}
                        />
                    )
                ) : isCensus ? (
                    censusStatsQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load report"
                            description={censusStatsQuery.error?.message}
                            action={
                                <button
                                    onClick={() => censusStatsQuery.refetch()}
                                    className="rpt-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <CensusStatsTable
                            data={
                                Array.isArray(censusStatsQuery.data)
                                    ? censusStatsQuery.data
                                    : []
                            }
                            loading={censusStatsQuery.isLoading}
                        />
                    )
                ) : isLevelOfCare ? (
                    levelOfCareQuery.isError ? (
                        <Alert
                            type="error"
                            message="Failed to load report"
                            description={levelOfCareQuery.error?.message}
                            action={
                                <button
                                    onClick={() => levelOfCareQuery.refetch()}
                                    className="rpt-retry-btn"
                                >
                                    Retry
                                </button>
                            }
                        />
                    ) : (
                        <CensusLevelOfCareTable
                            data={
                                Array.isArray(levelOfCareQuery.data)
                                    ? levelOfCareQuery.data
                                    : []
                            }
                            loading={levelOfCareQuery.isLoading}
                        />
                    )
                ) : (
                    <div className="rpt-placeholder">
                        {SUB_TABS.find((t) => t.key === subTab)?.label} — coming soon.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyCensusView;
