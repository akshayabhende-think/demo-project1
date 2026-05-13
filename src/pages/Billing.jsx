import { useCallback, useState } from "react";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import BillingToolbar from "../features/billing/BillingToolbar";
import BillingSubTabs from "../features/billing/BillingSubTabs";
import BillingTable from "../features/billing/BillingTable";
import SuperbillTable from "../features/billing/SuperbillTable";
import InvoicesTable from "../features/billing/InvoicesTable";
import ReceiptsTable from "../features/billing/ReceiptsTable";
import AddInvoiceModal from "../features/billing/AddInvoiceModal";
import { useBillingEncounters } from "../hooks/useBillingEncounters";
import { useBillingSuperbills } from "../hooks/useBillingSuperbills";
import { useBillingInvoices } from "../hooks/useBillingInvoices";
import { useBillingReceipts } from "../hooks/useBillingReceipts";
import { useFilteredEncounters } from "../features/billing/useFilteredEncounters";
import "../styles/billing/billing.css";
import "../styles/billing/billingTable.css";

const Billing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("encounterForBilling");
  const [encounterSubTab, setEncounterSubTab] = useState("billable");
  const [searchText, setSearchText] = useState("");
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  const isEncounterTab = activeTab === "encounterForBilling";
  const isSuperbillTab = activeTab === "superbill";
  const isInvoicesTab = activeTab === "invoices";
  const isReceiptTab = activeTab === "receipt";

  const encountersQuery = useBillingEncounters(isEncounterTab);
  const superbillsQuery = useBillingSuperbills(isSuperbillTab);
  const invoicesQuery = useBillingInvoices(isInvoicesTab);
  const receiptsQuery = useBillingReceipts(isReceiptTab);

  const filteredEncounters = useFilteredEncounters(
    encountersQuery.data,
    searchText,
    isEncounterTab ? encounterSubTab : null
  );

  const handleExport = useCallback((format) => {
    // console.log("Export billing data", format);
  }, []);

  const handleBatchSubmit = useCallback(() => {
    // console.log("Batch CMS1500 submit");
  }, []);

  const handleGenerateSuperbill = useCallback(() => {
    navigate("/billing/superbill/new");
  }, [navigate]);

  const handleAddInvoice = useCallback(() => {
    setInvoiceModalOpen(true);
  }, []);

  let bodyError = null;
  let body = null;

  if (isEncounterTab) {
    if (encountersQuery.isError) {
      bodyError = encountersQuery.error;
    } else {
      body = (
        <BillingTable
          data={filteredEncounters}
          loading={encountersQuery.isLoading}
          subTab={encounterSubTab}
        />
      );
    }
  } else if (isSuperbillTab) {
    if (superbillsQuery.isError) {
      bodyError = superbillsQuery.error;
    } else {
      body = (
        <SuperbillTable
          data={superbillsQuery.data}
          loading={superbillsQuery.isLoading}
        />
      );
    }
  } else if (isInvoicesTab) {
    if (invoicesQuery.isError) {
      bodyError = invoicesQuery.error;
    } else {
      body = (
        <InvoicesTable
          data={invoicesQuery.data}
          loading={invoicesQuery.isLoading}
        />
      );
    }
  } else if (isReceiptTab) {
    if (receiptsQuery.isError) {
      bodyError = receiptsQuery.error;
    } else {
      body = (
        <ReceiptsTable
          data={receiptsQuery.data}
          loading={receiptsQuery.isLoading}
        />
      );
    }
  } else {
    body = (
      <div className="bill-empty-tab">This tab is not implemented yet.</div>
    );
  }

  let refetch = encountersQuery.refetch;
  if (isSuperbillTab) refetch = superbillsQuery.refetch;
  else if (isInvoicesTab) refetch = invoicesQuery.refetch;
  else if (isReceiptTab) refetch = receiptsQuery.refetch;

  return (
    <div className="bill-page">
      <BillingToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchText={searchText}
        onSearchChange={setSearchText}
        onExport={handleExport}
        onBatchSubmit={handleBatchSubmit}
        onGenerateSuperbill={handleGenerateSuperbill}
        onAddInvoice={handleAddInvoice}
      />

      {isEncounterTab && (
        <BillingSubTabs
          activeKey={encounterSubTab}
          onChange={setEncounterSubTab}
        />
      )}

      {bodyError ? (
        <Alert
          type="error"
          message="Failed to load billing data"
          description={bodyError?.message}
          action={
            <button onClick={() => refetch()} className="bill-retry-btn">
              Retry
            </button>
          }
        />
      ) : (
        body
      )}

      <AddInvoiceModal
        open={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        encounter={null}
      />
    </div>
  );
};

export default Billing;
