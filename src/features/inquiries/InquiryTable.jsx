import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../components/common/CustomTable'
import { inquiryColumns } from './inquiryColumns'

const InquiryTable = ({ data, loading }) => {
    const navigate = useNavigate()

    const handleDelete = (id) => {
        // console.log('Delete', id)
    }

    const handleConvert = (record) => {
        navigate('/prospect/new')
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
