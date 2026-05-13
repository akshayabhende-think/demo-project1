import '../features/inquiries/inquiries.css'

import CustomTable from "../components/common/CustomTable";
import { inquiryColumns } from "../features/inquiries/inquiryColumns";
// import { useInquiries } from "../features/inquiries/useInquiries";
import { useState } from 'react';
import InquiryTable from '../features/inquiries/InquiryTable';
import { Button, Input } from 'antd';
import { FiFilter } from "react-icons/fi";
import FilterModal from '../features/inquiries/FilterModal';
import { useFilteredInquiries } from '../features/inquiries/useFilteredInquiries';
import { useInquiries } from '../hooks/useInquiries';
// const { search } = Input;


const Inquiries = () => {
  const [searchText, setSearchText] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    status: "",
    startDate: null,
    endDate: null,
  })

  const {data, isLoading} = useInquiries();

  const filteredData = useFilteredInquiries(data, searchText, filters);

  

  return (
    <div>
      <div className='inquiry-upper'>
        <p>Inquiries</p>
      <div className='inquiry-search'>
        

        <Input
          placeholder='Search inquiries...'
          allowClear
          onChange={(e) => setSearchText(e.target.value || "")}
          className="inquiry-search-input"
        />

        <Button
            icon={<FiFilter />}
            onClick={() => setIsFilterOpen(true)}
        />
      

      <FilterModal 
              open={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={(values) => setFilters(values)}
              initialValues={filters}
          />
      
      </div>
      </div>
      <div className="table-wrapper">
          <InquiryTable
            data={filteredData}
            loading={isLoading}
          />
          
      </div>

    

    
    </div>
  );

  // console.log("API DATA:", data)
};

export default Inquiries;