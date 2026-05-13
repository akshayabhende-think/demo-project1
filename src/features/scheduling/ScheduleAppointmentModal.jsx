import { useEffect, useMemo, useState } from "react";
import {
    Modal,
    Form,
    Select,
    Input,
    Button,
    Calendar,
    message,
} from "antd";
import { useCreateAppointment } from "./useAppointmentMutations";

const { Option } = Select;

const SESSION_TYPE_OPTIONS = ["Individual", "Group", "Family"];
const PATIENT_OPTIONS = [
    "Mar Glenn",
    "Royal Smith",
    "Sergio Dell",
    "Hall Fame",
    "June Kim",
    "Eve Christian",
    "Kane William",
    "Pranay Prabhate",
    "Olivia Rhye",
    "Andi Lane",
    "Kate Morrison",
    "Orlando Diggs",
    "Phoenix Baker",
    "Demi Wilkinson",
    "Natali Craig",
    "Candice Wu",
    "Lana Steiner",
];
const MODE_OPTIONS = ["Virtual", "In-Person", "Hybrid"];
const TYPE_OPTIONS = [
    "Initial Screening",
    "Follow Up",
    "DSM-5 Form",
    "LPHA Review",
    "Discharge Planning",
];
const COUNSELLOR_OPTIONS = ["Admin A", "Jhon Deo", "Sam Clerk"];
const LOCATION_OPTIONS = ["Onsite", "Virtual", "Hybrid"];
const PROCEDURE_OPTIONS = ["90791", "90834", "90837", "90847", "90853"];

const TIME_SLOTS = (() => {
    const slots = [];
    for (let h = 9; h < 18; h += 1) {
        for (let m = 0; m < 60; m += 30) {
            const period = h >= 12 ? "PM" : "AM";
            const display = h % 12 || 12;
            const mm = String(m).padStart(2, "0");
            const value = `${String(h).padStart(2, "0")}:${mm}`;
            slots.push({ value, label: `${display}:${mm} ${period}` });
        }
    }
    return slots;
})();

const renderOptions = (list) =>
    list.map((value) => (
        <Option key={value} value={value}>
            {value}
        </Option>
    ));

const formatYmd = (date) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};

const addMinutes = (timeStr, minutes) => {
    const [h, m] = timeStr.split(":").map(Number);
    const total = h * 60 + m + minutes;
    const hh = String(Math.floor(total / 60) % 24).padStart(2, "0");
    const mm = String(total % 60).padStart(2, "0");
    return `${hh}:${mm}`;
};

const ScheduleAppointmentModal = ({ open, onClose, defaultDate }) => {
    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(
        () => defaultDate || new Date()
    );
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [counselor, setCounselor] = useState(null);
    const createMutation = useCreateAppointment();

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setSelectedSlot(null);
            setCounselor(null);
        }
    }, [open, form]);

    const handleSubmit = (values) => {
        if (!selectedSlot) {
            message.error("Please select a time slot");
            return;
        }
        const minutes = Number(values.serviceTime) || 60;
        const payload = {
            patientName: values.patient,
            counsellorName: values.counsellor,
            sessionType: values.sessionType,
            appointmentMode: values.appointmentMode,
            appointmentType: values.appointmentType,
            location: values.location || "",
            procedure: values.procedure,
            serviceTime: minutes,
            date: formatYmd(selectedDate),
            start: selectedSlot,
            end: addMinutes(selectedSlot, minutes),
            status: "SCHEDULED",
            type: values.sessionType?.toLowerCase() === "group"
                ? "group"
                : "individual",
            isSigned: false,
        };

        createMutation.mutate(payload, {
            onSuccess: () => {
                message.success("Appointment scheduled");
                onClose();
            },
            onError: () => message.error("Failed to schedule appointment"),
        });
    };

    const footerNode = (
        <div className="schedule-modal-footer">
            <Button onClick={onClose} disabled={createMutation.isPending}>
                Cancel
            </Button>
            <Button
                type="primary"
                onClick={() => form.submit()}
                loading={createMutation.isPending}
            >
                Schedule Appointment
            </Button>
        </div>
    );

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={footerNode}
            width={960}
            destroyOnClose
            centered
            className="schedule-modal"
            title="Schedule New Appointment"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="schedule-modal-form"
                onValuesChange={(changed) => {
                    if (changed.counsellor !== undefined) {
                        setCounselor(changed.counsellor);
                    }
                }}
            >
                <div className="schedule-modal-grid schedule-modal-grid-2">
                    <Form.Item
                        label="Session Type"
                        name="sessionType"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select Type" allowClear>
                            {renderOptions(SESSION_TYPE_OPTIONS)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Patient"
                        name="patient"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select
                            placeholder="Select Patient"
                            allowClear
                            showSearch
                        >
                            {renderOptions(PATIENT_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>

                <div className="schedule-modal-grid schedule-modal-grid-3">
                    <Form.Item
                        label="Appointment Mode"
                        name="appointmentMode"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select Mode" allowClear>
                            {renderOptions(MODE_OPTIONS)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Appointment Type"
                        name="appointmentType"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select Type" allowClear>
                            {renderOptions(TYPE_OPTIONS)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Counsellor"
                        name="counsellor"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select Counsellor" allowClear>
                            {renderOptions(COUNSELLOR_OPTIONS)}
                        </Select>
                    </Form.Item>
                </div>

                <div className="schedule-modal-grid schedule-modal-grid-3">
                    <Form.Item label="Location" name="location">
                        <Select placeholder="Select Location" allowClear>
                            {renderOptions(LOCATION_OPTIONS)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Procedure"
                        name="procedure"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Select placeholder="Select Procedure" allowClear>
                            {renderOptions(PROCEDURE_OPTIONS)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Service Time"
                        name="serviceTime"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </div>

                <div className="schedule-modal-section-title">Date & Time</div>

                <div className="schedule-modal-datetime">
                    <div className="schedule-modal-calendar">
                        <Calendar
                            fullscreen={false}
                            onSelect={(d) => setSelectedDate(d.toDate())}
                            className="schedule-modal-calendar-inner"
                        />
                    </div>

                    <div className="schedule-modal-slots">
                        {!counselor ? (
                            <div className="schedule-modal-slots-empty">
                                Please select a counsellor first
                            </div>
                        ) : (
                            <div className="schedule-modal-slots-grid">
                                {TIME_SLOTS.map((slot) => (
                                    <button
                                        key={slot.value}
                                        type="button"
                                        className={`schedule-modal-slot ${
                                            selectedSlot === slot.value
                                                ? "is-active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedSlot(slot.value)
                                        }
                                    >
                                        {slot.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </Form>
        </Modal>
    );
};

export default ScheduleAppointmentModal;
