import { useCallback, useState } from "react";
import { Alert } from "antd";
import SchedulingToolbar from "../features/scheduling/SchedulingToolbar";
import SchedulingDateNav from "../features/scheduling/SchedulingDateNav";
import SchedulingDayView from "../features/scheduling/SchedulingDayView";
import SchedulingWeekView from "../features/scheduling/SchedulingWeekView";
import SchedulingMonthView from "../features/scheduling/SchedulingMonthView";
import SchedulingListView from "../features/scheduling/SchedulingListView";
import ScheduleAppointmentModal from "../features/scheduling/ScheduleAppointmentModal";
import AppointmentDetailsModal from "../features/scheduling/AppointmentDetailsModal";
import { VIEW_TYPE } from "../features/scheduling/constants";
import { useAppointments } from "../hooks/useAppointments";
import { useFilteredAppointments } from "../features/scheduling/useFilteredAppointments";
import "../styles/scheduling/scheduling.css";
import "../styles/scheduling/schedulingDayView.css";
import "../styles/scheduling/schedulingWeekView.css";
import "../styles/scheduling/schedulingMonthView.css";
import "../styles/scheduling/schedulingListView.css";
import "../styles/scheduling/scheduleAppointmentModal.css";
import "../styles/scheduling/appointmentDetailsModal.css";

const INITIAL_FILTERS = { counselor: "", location: "", status: "" };

const Scheduling = () => {
  const [viewType, setViewType] = useState(VIEW_TYPE.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [layout, setLayout] = useState("calendar");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);

  const { data, isLoading, isError, error } = useAppointments();
  const filteredData = useFilteredAppointments(data, filters);

  const handleOpenSchedule = useCallback(() => {
    setScheduleOpen(true);
  }, []);

  const handleCloseSchedule = useCallback(() => {
    setScheduleOpen(false);
  }, []);

  const handleAppointmentClick = useCallback((record) => {
    setActiveRecord(record);
  }, []);

  const handleDetailsClose = useCallback(() => {
    setActiveRecord(null);
  }, []);

  const handleStatusChange = useCallback((record, newStatus) => {
    // console.log("Change status", record.id, newStatus);
  }, []);

  const renderBody = () => {
    if (isError) {
      return (
        <Alert
          type="error"
          message="Failed to load appointments"
          description={error?.message}
        />
      );
    }

    if (layout === "list") {
      return (
        <SchedulingListView
          data={filteredData}
          loading={isLoading}
          onAppointmentClick={handleAppointmentClick}
        />
      );
    }

    if (viewType === VIEW_TYPE.DAY) {
      return (
        <SchedulingDayView
          appointments={filteredData}
          currentDate={currentDate}
          loading={isLoading}
          onAppointmentClick={handleAppointmentClick}
        />
      );
    }

    if (viewType === VIEW_TYPE.WEEK) {
      return (
        <SchedulingWeekView
          appointments={filteredData}
          currentDate={currentDate}
          onAppointmentClick={handleAppointmentClick}
        />
      );
    }

    if (viewType === VIEW_TYPE.WORK_WEEK) {
      return (
        <SchedulingWeekView
          appointments={filteredData}
          currentDate={currentDate}
          workWeek
          onAppointmentClick={handleAppointmentClick}
        />
      );
    }

    if (viewType === VIEW_TYPE.MONTH) {
      return (
        <SchedulingMonthView
          appointments={filteredData}
          currentDate={currentDate}
          onAppointmentClick={handleAppointmentClick}
        />
      );
    }

    return null;
  };

  return (
    <div className="scheduling-page">
      <SchedulingToolbar
        listLayout={layout}
        onLayoutChange={setLayout}
        onScheduleAppointment={handleOpenSchedule}
        filters={filters}
        onApplyFilters={setFilters}
      />

      {layout === "calendar" && (
        <SchedulingDateNav
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />
      )}

      {renderBody()}

      <ScheduleAppointmentModal
        open={scheduleOpen}
        onClose={handleCloseSchedule}
        defaultDate={currentDate}
      />

      <AppointmentDetailsModal
        open={Boolean(activeRecord)}
        record={activeRecord}
        onClose={handleDetailsClose}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Scheduling;
