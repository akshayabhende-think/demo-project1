import { useState } from "react";
import { Alert } from "antd";
import ClientToolbar from "../features/clients/ClientToolbar";
import ClientTable from "../features/clients/ClientTable";
import { useClients } from "../hooks/useClients";
import { useFilteredClients } from "../features/clients/useFilteredClients";
import "../styles/client/client.css";

const INITIAL_FILTERS = { status: "", startDate: null, endDate: null };

const Client = () => {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const { data, isLoading, isError, error, refetch } = useClients();
  const filteredData = useFilteredClients(data, searchText, filters);

  return (
    <div className="client-page">
      <ClientToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {isError ? (
        <Alert
          type="error"
          message="Failed to load clients"
          description={error?.message}
          action={
            <button onClick={() => refetch()} className="client-retry-btn">
              Retry
            </button>
          }
        />
      ) : (
        <ClientTable data={filteredData} loading={isLoading} />
      )}
    </div>
  );
};

export default Client;
