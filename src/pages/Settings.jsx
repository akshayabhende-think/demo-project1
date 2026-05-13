import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SettingsCard from "../features/settings/SettingsCard";
import { SETTINGS_CARDS } from "../features/settings/settingsConfig";
import "../styles/settings/settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const handleItemClick = useCallback(
    (cardKey, itemKey) => {
      if (cardKey === "appointment") {
        navigate("/settings/appointment", {
          state: { initialTab: itemKey },
        });
        return;
      }
      if (cardKey === "providerAccount") {
        const tabMap = {
          providerProfile: "providerGroupProfile",
          notification: "notification",
          patientFlag: "patientFlag",
        };
        navigate("/settings/provider-account", {
          state: { initialTab: tabMap[itemKey] ?? "providerGroupProfile" },
        });
        return;
      }
      if (cardKey === "practice") {
        navigate("/settings/practice", {
          state: { initialTab: itemKey },
        });
        return;
      }
      if (cardKey === "patientCommunications") {
        navigate("/settings/patient-communications");
        return;
      }
      if (cardKey === "master") {
        navigate("/settings/master", {
          state: { initialTab: itemKey },
        });
        return;
      }
      if (cardKey === "templates") {
        navigate("/settings/templates", {
          state: { initialTab: itemKey === "macros" ? "macros" : "note" },
        });
        return;
      }
      if (cardKey === "billing" && itemKey === "feeSchedule") {
        navigate("/settings/billing/fee-schedule");
        return;
      }
      console.log("Open settings", cardKey, itemKey);
    },
    [navigate]
  );

  return (
    <div className="settings-page">
      <div className="settings-grid">
        {SETTINGS_CARDS.map((card) => (
          <SettingsCard
            key={card.key}
            title={card.title}
            icon={card.icon}
            items={card.items}
            onItemClick={(itemKey) => handleItemClick(card.key, itemKey)}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;
