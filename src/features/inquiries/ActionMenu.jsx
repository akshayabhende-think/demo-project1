import { Menu } from "antd";

const ActionMenu = ({ record, onDelete }) => {
  return (
    <Menu
      onClick={({ key }) => {
        if (key === "delete") {
          onDelete(record.id);
        }
        if (key === "edit") {
          console.log("Edit", record);
        }
      }}
      items={[
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete" },
      ]}
    />
  );
};

export default ActionMenu;