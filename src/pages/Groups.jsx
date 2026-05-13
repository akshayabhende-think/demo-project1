import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import GroupToolbar from "../features/groups/GroupToolbar";
import GroupTable from "../features/groups/GroupTable";
import { useGroups } from "../hooks/useGroups";
import { useFilteredGroups } from "../features/groups/useFilteredGroups";
import "../styles/group/group.css";

const INITIAL_FILTERS = { status: "", startDate: null, endDate: null };

const Groups = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useGroups();
  const filteredData = useFilteredGroups(data, searchText, filters);

  const handleView = useCallback((record) => {
    console.log("View group", record);
  }, []);

  const handleEdit = useCallback((record) => {
    console.log("Edit group", record);
  }, []);

  const handleAddGroup = useCallback(() => {
    navigate("/groups/new");
  }, [navigate]);

  return (
    <div className="group-page">
      <GroupToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddGroup={handleAddGroup}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {isError ? (
        <Alert
          type="error"
          message="Failed to load groups"
          description={error?.message}
          action={
            <button onClick={() => refetch()} className="group-retry-btn">
              Retry
            </button>
          }
        />
      ) : (
        <GroupTable
          data={filteredData}
          loading={isLoading}
          onView={handleView}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Groups;
