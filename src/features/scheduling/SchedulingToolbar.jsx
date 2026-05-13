import { memo, useState } from "react";
import { Button, Popover } from "antd";
import {
    FilterOutlined,
    PlusOutlined,
    UnorderedListOutlined,
    CalendarOutlined,
} from "@ant-design/icons";
import SchedulingFilterContent from "./SchedulingFilterContent";

const noop = () => {};

const SchedulingToolbar = ({
    onScheduleAppointment = noop,
    listLayout = "calendar",
    onLayoutChange = noop,
    filters,
    onApplyFilters = noop,
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="scheduling-toolbar">
            <h2 className="scheduling-page-title">Appointments</h2>

            <div className="scheduling-toolbar-actions">
                <Popover
                    open={filterOpen}
                    onOpenChange={setFilterOpen}
                    trigger="click"
                    placement="bottomRight"
                    arrow={false}
                    destroyTooltipOnHide
                    content={
                        <SchedulingFilterContent
                            initialValues={filters}
                            onClose={() => setFilterOpen(false)}
                            onApply={onApplyFilters}
                        />
                    }
                >
                    <Button
                        className="scheduling-icon-btn"
                        icon={<FilterOutlined />}
                        aria-label="Filter appointments"
                    />
                </Popover>

                <div className="scheduling-layout-group">
                    <button
                        type="button"
                        className={`scheduling-layout-btn ${
                            listLayout === "list" ? "is-active" : ""
                        }`}
                        onClick={() => onLayoutChange("list")}
                        aria-label="List view"
                    >
                        <UnorderedListOutlined />
                    </button>
                    <button
                        type="button"
                        className={`scheduling-layout-btn ${
                            listLayout === "calendar" ? "is-active" : ""
                        }`}
                        onClick={() => onLayoutChange("calendar")}
                        aria-label="Calendar view"
                    >
                        <CalendarOutlined />
                    </button>
                </div>

                <Button
                    type="primary"
                    className="scheduling-add-btn"
                    icon={<PlusOutlined />}
                    onClick={onScheduleAppointment}
                >
                    Schedule Appointment
                </Button>
            </div>
        </div>
    );
};

export default memo(SchedulingToolbar);
