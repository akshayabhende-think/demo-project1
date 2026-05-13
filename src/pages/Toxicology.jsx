import { useCallback, useState } from "react";
import { Alert } from "antd";
import ToxicologyToolbar from "../features/toxicology/ToxicologyToolbar";
import ToxicologyTable from "../features/toxicology/ToxicologyTable";
import { useToxicologyTests } from "../hooks/useToxicologyTests";
import { useToxicologyExceptions } from "../hooks/useToxicologyExceptions";
import { useToxicologyShipments } from "../hooks/useToxicologyShipments";
import { useToxicologyPendingResults } from "../hooks/useToxicologyPendingResults";
import { useToxicologyRejected } from "../hooks/useToxicologyRejected";
import { useToxicologyResults } from "../hooks/useToxicologyResults";
import { useFilteredTests } from "../features/toxicology/useFilteredTests";
import "../styles/toxicology/toxicology.css";
import "../styles/toxicology/toxicologyTable.css";

const Toxicology = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchText, setSearchText] = useState("");

  const isExceptionsTab = activeTab === "exceptions";
  const isShippingTab = activeTab === "shipping";
  const isPendingResultsTab = activeTab === "pendingResults";
  const isRejectedTab = activeTab === "rejected";
  const isResultsTab = activeTab === "results";

  const testsQuery = useToxicologyTests();
  const exceptionsQuery = useToxicologyExceptions(isExceptionsTab);
  const shipmentsQuery = useToxicologyShipments(isShippingTab);
  const pendingResultsQuery = useToxicologyPendingResults(isPendingResultsTab);
  const rejectedQuery = useToxicologyRejected(isRejectedTab);
  const resultsQuery = useToxicologyResults(isResultsTab);

  let activeQuery = testsQuery;
  if (isExceptionsTab) activeQuery = exceptionsQuery;
  else if (isShippingTab) activeQuery = shipmentsQuery;
  else if (isPendingResultsTab) activeQuery = pendingResultsQuery;
  else if (isRejectedTab) activeQuery = rejectedQuery;
  else if (isResultsTab) activeQuery = resultsQuery;

  const { data, isLoading, isError, error, refetch } = activeQuery;

  let filterTab = activeTab;
  if (
    isExceptionsTab ||
    isShippingTab ||
    isPendingResultsTab ||
    isRejectedTab ||
    isResultsTab
  ) {
    filterTab = null;
  }

  const filteredData = useFilteredTests(data, searchText, filterTab);

  const handleExport = useCallback((format) => {
    console.log("Export toxicology data", format);
  }, []);

  const handleCreateShipment = useCallback(() => {
    console.log("Create shipment");
  }, []);

  return (
    <div className="tox-page">
      <ToxicologyToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchText={searchText}
        onSearchChange={setSearchText}
        onExport={handleExport}
        onCreateShipment={handleCreateShipment}
      />

      {isError ? (
        <Alert
          type="error"
          message="Failed to load toxicology data"
          description={error?.message}
          action={
            <button onClick={() => refetch()} className="tox-retry-btn">
              Retry
            </button>
          }
        />
      ) : (
        <ToxicologyTable
          data={filteredData}
          loading={isLoading}
          activeTab={activeTab}
        />
      )}
    </div>
  );
};

export default Toxicology;
