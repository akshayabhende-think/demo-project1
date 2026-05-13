import { memo, useState, useCallback } from "react";
import { Checkbox } from "antd";
import {
    NOTIFICATION_CHANNELS,
    NOTIFICATION_SECTIONS,
    buildDefaultNotificationState,
} from "./notificationConfig";

const formatChannelLabel = (channel) =>
    channel.charAt(0).toUpperCase() + channel.slice(1);

const NotificationPreferences = ({ stateOverride, onChange }) => {
    const [internal, setInternal] = useState(buildDefaultNotificationState);
    const state = stateOverride ?? internal;

    const handleToggle = useCallback(
        (sectionKey, itemKey, channel, checked) => {
            const cellKey = `${sectionKey}.${itemKey}`;
            const next = {
                ...state,
                [cellKey]: { ...state[cellKey], [channel]: checked },
            };
            if (onChange) onChange(next);
            else setInternal(next);
        },
        [state, onChange]
    );

    return (
        <div className="pa-notif">
            {NOTIFICATION_SECTIONS.map((section) => (
                <section key={section.key} className="pa-notif-section">
                    <h4 className="pa-notif-section-title">{section.title}</h4>
                    <div className="pa-notif-table">
                        <div className="pa-notif-row pa-notif-head">
                            <span className="pa-notif-title-col">Title</span>
                            {NOTIFICATION_CHANNELS.map((channel) => (
                                <span
                                    key={channel}
                                    className="pa-notif-channel-col"
                                >
                                    {formatChannelLabel(channel)}
                                </span>
                            ))}
                        </div>
                        {section.items.map((item) => {
                            const cellKey = `${section.key}.${item.key}`;
                            const cellState = state[cellKey] ?? {};
                            return (
                                <div
                                    key={item.key}
                                    className="pa-notif-row"
                                >
                                    <span className="pa-notif-title-col pa-notif-item-label">
                                        {item.label}
                                    </span>
                                    {NOTIFICATION_CHANNELS.map((channel) => (
                                        <span
                                            key={channel}
                                            className="pa-notif-channel-col"
                                        >
                                            <Checkbox
                                                checked={
                                                    cellState[channel] ?? false
                                                }
                                                onChange={(e) =>
                                                    handleToggle(
                                                        section.key,
                                                        item.key,
                                                        channel,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </span>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default memo(NotificationPreferences);
