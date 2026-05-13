import { memo, useMemo } from "react";
import CustomTable from "../../components/common/CustomTable";

const TABLE_SCROLL = { y: 420, x: 1200 };
const PAGINATION = { pageSize: 15, pageSizeOptions: [10, 15, 20] };

const renderTitle = (label) => <span className="rpt-col-title">{label}</span>;

const CensusDemographicsTable = ({ data, loading }) => {
    const columns = useMemo(
        () => [
            {
                title: renderTitle("Client name"),
                dataIndex: "clientName",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Client ID"),
                dataIndex: "clientId",
                width: 110,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Date of birth"),
                dataIndex: "dateOfBirth",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Gender"),
                dataIndex: "gender",
                width: 140,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Race/ethnicity"),
                dataIndex: "raceEthnicity",
                width: 160,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Primary substance"),
                dataIndex: "primarySubstance",
                width: 180,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Referral source"),
                dataIndex: "referralSource",
                width: 150,
                render: (val) => val || "--",
            },
            {
                title: renderTitle("Medical status"),
                dataIndex: "medicalStatus",
                width: 180,
                render: (val) => val || "--",
            },
        ],
        []
    );

    return (
        <div className="rpt-table">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                scroll={TABLE_SCROLL}
                pagination={PAGINATION}
            />
        </div>
    );
};

export default memo(CensusDemographicsTable);
