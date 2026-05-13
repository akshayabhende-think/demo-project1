import { useState } from "react";
import { Dropdown, Popover } from "antd";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProspectViewContent from "./ProspectViewContent";
import { ARCHIVE_STATUS } from "./constants";
import "../../styles/prospect/prospectViewModal.css";

const BASE_MENU_ITEMS = [
    { key: "view", label: "View" },
    { key: "edit", label: "Edit" },
];

const ARCHIVE_ITEM = { key: "archive", label: "Archive" };
const UNARCHIVE_ITEM = { key: "unarchive", label: "Unarchive" };

const buildMenuItems = (activeTab) => {
    if (activeTab === ARCHIVE_STATUS.ARCHIVE) {
        return [...BASE_MENU_ITEMS, UNARCHIVE_ITEM];
    }
    if (activeTab === ARCHIVE_STATUS.ACTIVE) {
        return [...BASE_MENU_ITEMS, ARCHIVE_ITEM];
    }
    return BASE_MENU_ITEMS;
};

const ProspectActionCell = ({
    record,
    activeTab,
    onView,
    onEdit,
    onArchive,
    onUnarchive,
}) => {
    const [viewOpen, setViewOpen] = useState(false);

    const items = buildMenuItems(activeTab);

    const handleMenuClick = ({ key }) => {
        if (key === "view") {
            setViewOpen(true);
            onView?.(record);
            return;
        }
        if (key === "edit") onEdit?.(record);
        if (key === "archive") onArchive?.(record);
        if (key === "unarchive") onUnarchive?.(record);
    };

    const closeView = () => setViewOpen(false);

    return (
        <Popover
            open={viewOpen}
            onOpenChange={(open) => {
                if (!open) closeView();
            }}
            placement="bottomRight"
            trigger={[]}
            arrow={false}
            destroyTooltipOnHide
            content={
                <ProspectViewContent record={record} onClose={closeView} />
            }
        >
            <Dropdown
                menu={{ items, onClick: handleMenuClick }}
                trigger={["click"]}
            >
                <span className="prospect-action-trigger">
                    <HiOutlineDotsVertical />
                </span>
            </Dropdown>
        </Popover>
    );
};

export default ProspectActionCell;
