import { memo, useState } from "react";
import { Input, Button, Popover } from "antd";
import {
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import TaskFilterContent from "./TaskFilterContent";
import { TASK_TABS } from "./constants";

const noop = () => {};

const TaskToolbar = ({
    activeTab = "all",
    onTabChange = noop,
    searchText = "",
    onSearchChange = noop,
    onCreateTask = noop,
    filters,
    onApplyFilters = noop,
    clientOptions = [],
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="task-toolbar">
            <div className="task-tabs" role="tablist">
                {TASK_TABS.map(({ key, label }) => {
                    const isActive = activeTab === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`task-tab ${isActive ? "is-active" : ""}`}
                            onClick={() => onTabChange(key)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            <div className="task-toolbar-spacer" />

            <div className="task-toolbar-actions">
                <Input
                    className="task-search"
                    placeholder="Search..."
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
                        <TaskFilterContent
                            initialValues={filters}
                            onClose={() => setFilterOpen(false)}
                            onApply={onApplyFilters}
                            clientOptions={clientOptions}
                        />
                    }
                >
                    <Button
                        className="task-icon-btn"
                        icon={<FilterOutlined />}
                        aria-label="Filter tasks"
                    />
                </Popover>

                <Button
                    type="primary"
                    className="task-create-btn"
                    icon={<PlusOutlined />}
                    onClick={onCreateTask}
                >
                    Create Task
                </Button>
            </div>
        </div>
    );
};

export default memo(TaskToolbar);
