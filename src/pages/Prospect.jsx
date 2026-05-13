import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, message } from "antd";
import ProspectCards from "../features/prospects/ProspectCards";
import ProspectToolbar from "../features/prospects/ProspectToolbar";
import ProspectTable from "../features/prospects/ProspectTable";
import { useProspects } from "../hooks/useProspects";
import {
  useFilteredProspects,
  useProspectTabCounts,
} from "../features/prospects/useFilteredProspects";
import {
  useArchiveProspect,
  useUnarchiveProspect,
} from "../features/prospects/useProspectMutations";
import { ARCHIVE_STATUS } from "../features/prospects/constants";
import "../styles/prospect/prospect.css";

const INITIAL_FILTERS = { status: "" };

const Prospect = () => {
  const [activeTab, setActiveTab] = useState(ARCHIVE_STATUS.ACTIVE);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useProspects();
  const filteredData = useFilteredProspects(data, searchText, activeTab, filters);
  const tabCounts = useProspectTabCounts(data);
  const archiveMutation = useArchiveProspect();
  const unarchiveMutation = useUnarchiveProspect();

  const handleEdit = useCallback(
    (record) => {
      navigate(`/prospect/${encodeURIComponent(record.id)}/edit`);
    },
    [navigate]
  );

  const handleArchive = useCallback(
    (record) => {
      archiveMutation.mutate(record.id, {
        onSuccess: () => message.success(`${record.name} moved to Archive`),
        onError: () => message.error("Failed to archive prospect"),
      });
    },
    [archiveMutation]
  );

  const handleUnarchive = useCallback(
    (record) => {
      unarchiveMutation.mutate(record.id, {
        onSuccess: () => message.success(`${record.name} moved to Active`),
        onError: () => message.error("Failed to unarchive prospect"),
      });
    },
    [unarchiveMutation]
  );

  const handleExport = useCallback((format) => {
    // console.log("Export prospects as", format);
  }, []);

  const handleAddProspect = useCallback(() => {
    navigate("/prospect/new");
  }, [navigate]);

  return (
    <div className="prospect-page">
      <ProspectCards />

      <ProspectToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchText={searchText}
        onSearchChange={setSearchText}
        onExport={handleExport}
        onAddProspect={handleAddProspect}
        filters={filters}
        onApplyFilters={setFilters}
        tabCounts={tabCounts}
      />

      {isError ? (
        <Alert
          type="error"
          message="Failed to load prospects"
          description={error?.message}
          action={
            <button onClick={() => refetch()} className="prospect-retry-btn">
              Retry
            </button>
          }
          style={{ marginTop: 12 }}
        />
      ) : (
        <ProspectTable
          data={filteredData}
          loading={isLoading}
          activeTab={activeTab}
          onEdit={handleEdit}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
        />
      )}
    </div>
  );
};

export default Prospect;
