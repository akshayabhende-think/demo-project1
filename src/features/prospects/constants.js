export const ARCHIVE_STATUS = Object.freeze({
    ACTIVE: "active",
    ON_HOLD: "onHold",
    ARCHIVE: "archive",
});

export const PROSPECT_TABS = Object.freeze([
    { key: ARCHIVE_STATUS.ACTIVE, label: "Active" },
    { key: ARCHIVE_STATUS.ON_HOLD, label: "On Hold" },
    { key: ARCHIVE_STATUS.ARCHIVE, label: "Archive" },
]);

export const PROSPECT_STATUS = Object.freeze({
    ACTIVE: "Active",
    IN_PROGRESS: "In Progress",
    QUALIFIED_LEAD: "Qualified Lead",
    NO_ACTIVITY: "No Activity",
    ADMITTED: "Admitted",
});

export const PROSPECT_STATUS_OPTIONS = Object.freeze(
    Object.values(PROSPECT_STATUS).map((value) => ({ value, label: value }))
);

export const PROSPECT_STATUS_COLORS = Object.freeze({
    [PROSPECT_STATUS.ACTIVE]: "green",
    [PROSPECT_STATUS.IN_PROGRESS]: "red",
    [PROSPECT_STATUS.QUALIFIED_LEAD]: "gold",
    [PROSPECT_STATUS.ADMITTED]: "blue",
    [PROSPECT_STATUS.NO_ACTIVITY]: "default",
});

export const PROSPECT_QUERY_KEY = "prospects";

export const PAGE_SIZE_OPTIONS = [10, 15, 20];
export const DEFAULT_PAGE_SIZE = 15;

export const EXPORT_FORMAT = Object.freeze({
    XLSX: "xlsx",
    PDF: "pdf",
});

export const EXPORT_MENU_ITEMS = Object.freeze([
    { key: EXPORT_FORMAT.XLSX, label: "Export as XLSX" },
    { key: EXPORT_FORMAT.PDF, label: "Export as PDF" },
]);
