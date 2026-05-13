import { Dropdown } from "antd";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MENU_ITEMS = [
    { key: "view", label: "View" },
    { key: "edit", label: "Edit" },
];

const GroupActionCell = ({ record, onView, onEdit }) => {
    const handleClick = ({ key }) => {
        if (key === "view") onView?.(record);
        if (key === "edit") onEdit?.(record);
    };

    return (
        <Dropdown
            menu={{ items: MENU_ITEMS, onClick: handleClick }}
            trigger={["click"]}
        >
            <span className="group-action-trigger">
                <HiOutlineDotsVertical />
            </span>
        </Dropdown>
    );
};

export default GroupActionCell;
