import { useCallback, useMemo, useState } from "react";
import { Alert } from "antd";
import TaskToolbar from "../features/tasks/TaskToolbar";
import TaskTable from "../features/tasks/TaskTable";
import CreateTaskModal from "../features/tasks/CreateTaskModal";
import { useTasks } from "../hooks/useTasks";
import { useFilteredTasks } from "../features/tasks/useFilteredTasks";
import "../styles/task/task.css";
import "../styles/task/createTaskModal.css";

const INITIAL_FILTERS = {
  clientName: "",
  priority: "",
  status: "",
  dueDate: null,
};

const Task = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useTasks();
  const filteredData = useFilteredTasks(data, searchText, activeTab, filters);

  const clientOptions = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return Array.from(
      new Set(data.map((t) => t.clientName).filter(Boolean))
    ).sort();
  }, [data]);

  const handleCreateTask = useCallback(() => {
    setCreateOpen(true);
  }, []);

  const handleCloseCreate = useCallback(() => {
    setCreateOpen(false);
  }, []);

  const handleView = useCallback((record) => {
    console.log("View task", record);
  }, []);

  const handleEdit = useCallback((record) => {
    console.log("Edit task", record);
  }, []);

  return (
    <div className="task-page">
      <TaskToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchText={searchText}
        onSearchChange={setSearchText}
        onCreateTask={handleCreateTask}
        filters={filters}
        onApplyFilters={setFilters}
        clientOptions={clientOptions}
      />

      {isError ? (
        <Alert
          type="error"
          message="Failed to load tasks"
          description={error?.message}
          action={
            <button onClick={() => refetch()} className="task-retry-btn">
              Retry
            </button>
          }
        />
      ) : (
        <TaskTable
          data={filteredData}
          loading={isLoading}
          onView={handleView}
          onEdit={handleEdit}
          activeTab={activeTab}
        />
      )}

      <CreateTaskModal
        open={createOpen}
        onClose={handleCloseCreate}
        clientOptions={clientOptions}
      />
    </div>
  );
};

export default Task;
