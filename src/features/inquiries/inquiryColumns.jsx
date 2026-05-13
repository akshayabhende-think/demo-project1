// src/components/inquiries/inquiryColumns.js

import { Tag, Button, Dropdown, Popconfirm } from "antd";
// import ActionMenu from "./ActionMenu";
import { HiOutlineDotsVertical } from "react-icons/hi";


// const handleConvertToProspect = (record) => {
//   console.log("Convert:", record)
// }

// const handleMenuClick = (key, record) => {
//   if (key === "edit") {
//     console.log("Edit", record)
//   }
//   if (key === "delete") {
//     console.log("Delete", record)
//   }
// }

const getStatusColor = (status) => {
  if (status === "New") return "green";
  if (status === "Closed") return "red";
  return "orange"
}

export const inquiryColumns = ({ onDelete, onConvert }) => [
  {
    title: "Name",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 220,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    width: 150,
  },
  {
    title: "Message",
    dataIndex: "message",
    width: 280,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 110,
    render: (_, record) => (
      <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
    )
  },
  {
    title: "Action",
    key: "action",
    width: 240,
    render: (_, record) => {
      const isClosed = record.status === "Closed"
      const menuItems = [
      {
        key: 'close',
        label: "Close Inquiry",
      },
      {
        key: 'delete',
        label: (
          <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => onDelete(record.id)}
          >
            <span style={{ color: 'red' }}>Delete Inquiry</span>

          </Popconfirm>
        )
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>

        <Button
          type="default"
          disabled={isClosed}
          onClick={() => onConvert(record)}
          style={{ borderRadius: '6px', whiteSpace: 'nowrap' }}
        >
          Convert to Prospect
        </Button>

        <Dropdown
            menu={{
              items: menuItems,
              // onClick: ({ key }) => handleMenuClick(key, record),
            }}
            trigger={['click']}
        >
          <HiOutlineDotsVertical style={{ cursor: 'pointer' }}/>
        </Dropdown>

      </div>
    )
    }
  },
];