import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getInquiries } from "../api/inquiryApi";

export const useInquiries = () => {
    return useQuery({
        queryKey: ["inquiries"],
        queryFn: getInquiries,
        placeholderData: keepPreviousData,
    });
};
