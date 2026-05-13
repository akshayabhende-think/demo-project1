import React from 'react'
import CustomTable from '../../components/common/CustomTable'
import { inquiryColumns } from './inquiryColumns'

const InquiryTable = ({ data, loading }) => {
    const handleDelete = (id) => {
        console.log('Delete', id)
    }

    const handleConvert = (record) => {
        console.log('Convert', record)
    }

    return (
        <CustomTable
            columns={inquiryColumns({
                onDelete: handleDelete,
                onConvert: handleConvert,
            })}
            data={data}
            loading={loading}
            scroll={{ y: 410, x: 1100 }}
        />
    )
}

export default InquiryTable
