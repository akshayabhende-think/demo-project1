import { Table } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const renderPaginationItem = (_, type, originalElement) => {
    if (type === 'prev') {
        return (
            <span className="custom-pager-btn">
                <LeftOutlined /> Previous
            </span>
        )
    }
    if (type === 'next') {
        return (
            <span className="custom-pager-btn">
                Next <RightOutlined />
            </span>
        )
    }
    return originalElement
}

const showTotal = (total, range) =>
    `${range[0]}-${range[1]} of ${total} Rows`

const defaultPagination = {
    pageSize: 15,
    showSizeChanger: true,
    pageSizeOptions: [10, 15, 20],
    showTotal,
    itemRender: renderPaginationItem,
    locale: { items_per_page: '' },
}

const CustomTable = ({
    columns,
    data = [],
    loading = false,
    rowKey = 'id',
    pagination,
    scroll = { y: 470, x: false },
    rowSelection,
    locale,
}) => {
    const mergedPagination =
        pagination === false
            ? false
            : { ...defaultPagination, ...(pagination || {}) }

    return (
        <Table
            className="custom-pagination-table"
            columns={columns}
            dataSource={Array.isArray(data) ? data : []}
            loading={loading}
            rowKey={rowKey}
            pagination={mergedPagination}
            scroll={scroll}
            rowSelection={rowSelection}
            locale={locale}
        />
    )
}

export default CustomTable
