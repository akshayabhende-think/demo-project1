import { memo, useState } from "react";
import { Input, Button, Popover } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import ClientFilterContent from "./ClientFilterContent";

const noop = () => {};

const ClientToolbar = ({
    searchText = "",
    onSearchChange = noop,
    filters,
    onApplyFilters = noop,
}) => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="client-toolbar">
            <h2 className="client-page-title">Client List</h2>

            <div className="client-toolbar-actions">
                <Input
                    className="client-search"
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
                        <ClientFilterContent
                            initialValues={filters}
                            onClose={() => setFilterOpen(false)}
                            onApply={onApplyFilters}
                        />
                    }
                >
                    <Button
                        className="client-icon-btn"
                        icon={<FilterOutlined />}
                        aria-label="Filter clients"
                    />
                </Popover>
            </div>
        </div>
    );
};

export default memo(ClientToolbar);
