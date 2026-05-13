import { memo } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { VIEW_TABS } from "./constants";
import { formatRange, shiftDate } from "./dateUtils";

const noop = () => {};

const SchedulingDateNav = ({
    currentDate = new Date(),
    onCurrentDateChange = noop,
    viewType = "week",
    onViewTypeChange = noop,
}) => {
    const goToday = () => onCurrentDateChange(new Date());
    const goPrev = () => onCurrentDateChange(shiftDate(viewType, currentDate, "prev"));
    const goNext = () => onCurrentDateChange(shiftDate(viewType, currentDate, "next"));

    return (
        <div className="scheduling-datenav">
            <div className="scheduling-datenav-left">
                <Button
                    onClick={goToday}
                    className="scheduling-today-btn"
                >
                    Today
                </Button>
                <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={goPrev}
                    aria-label="Previous"
                />
                <span className="scheduling-date-range">
                    {formatRange(viewType, currentDate)}
                </span>
                <Button
                    type="text"
                    icon={<RightOutlined />}
                    onClick={goNext}
                    aria-label="Next"
                />
            </div>

            <div className="scheduling-view-tabs" role="tablist">
                {VIEW_TABS.map(({ key, label }) => {
                    const isActive = viewType === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`scheduling-view-tab ${
                                isActive ? "is-active" : ""
                            }`}
                            onClick={() => onViewTypeChange(key)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(SchedulingDateNav);
