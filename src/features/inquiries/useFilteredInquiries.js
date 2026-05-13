import { useMemo } from "react"



export const useFilteredInquiries = (data, searchText, filters) => {
    return useMemo(() => {
        return (data ?? []).filter((item) => {
            const matchesSearch = Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchText.toLowerCase()))

            const matchesStatus = filters.status
                ? item.status === filters.status
                : true;

            const itemDate = item.date ? new Date(item.date) : null;

            const matchesStartDate = filters.startDate
                ? itemDate && itemDate >= filters.startDate.toDate()
                : true;

            const matchesEndDate = filters.endDate
                ? itemDate && itemDate <= filters.endDate.toDate()
                : true;

            return (
                matchesSearch &&
                matchesStatus && 
                matchesStartDate &&
                matchesEndDate           
            );
        });
    
    }, [data, searchText, filters]);
};