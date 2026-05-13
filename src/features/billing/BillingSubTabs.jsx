import { memo } from "react";
import { BILLING_ENCOUNTER_SUB_TABS } from "./constants";

const noop = () => {};

const BillingSubTabs = ({ activeKey = "billable", onChange = noop }) => (
    <div className="bill-subtabs" role="tablist">
        {BILLING_ENCOUNTER_SUB_TABS.map(({ key, label }) => {
            const isActive = activeKey === key;
            return (
                <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`bill-subtab ${isActive ? "is-active" : ""}`}
                    onClick={() => onChange(key)}
                >
                    {label}
                </button>
            );
        })}
    </div>
);

export default memo(BillingSubTabs);
