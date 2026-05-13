import { memo, useState } from "react";
import { Input, Button, Popover } from "antd";
import {
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import GroupFilterContent from "./GroupFilterContent";

const noop = () => {};

const GroupToolbar = ({
    searchText = "",
    onSearchChange = noop,
    onAddGroup = noop,
    filters,
    onApplyFilters = noop,
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="group-toolbar">
            <h2 className="group-page-title">Groups</h2>

            <div className="group-toolbar-actions">
                <Input
                    className="group-search"
                    placeholder="Search Patient"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    allowClear
                />

                <Popover
                    open={filterOpen}
                    onOpenChange={setFilterOpen}
                    trigger="click"
                    placement="bottomRight"
                    arrow={false}
                    destroyTooltipOnHide
                    content={
                        <GroupFilterContent
                            initialValues={filters}
                            onClose={() => setFilterOpen(false)}
                            onApply={onApplyFilters}
                        />
                    }
                >
                    <Button
                        className="group-icon-btn"
                        icon={<FilterOutlined />}
                        aria-label="Filter groups"
                    />
                </Popover>

                <Button
                    type="primary"
                    className="group-add-btn"
                    icon={<PlusOutlined />}
                    onClick={onAddGroup}
                >
                    Add Group
                </Button>
            </div>
        </div>
    );
};

export default memo(GroupToolbar);
