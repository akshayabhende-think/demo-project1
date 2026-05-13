import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Input, Checkbox, message } from "antd";
import {
    CloseOutlined,
    SearchOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNoteTemplate } from "../../api/templatesApi";
import "../../styles/templates/addNoteFormatModal.css";

const ALL_SECTIONS = [
    "Problem Details",
    "Interventions",
    "Data",
    "Assessment",
    "Care Plan",
    "Information",
    "Episode Information",
    "Discharge Reason",
    "Chief Complaint",
    "History of Present Illness",
    "Past Medical History",
    "Family History",
    "Social History",
    "Medications",
    "Allergies",
    "Review of Systems",
    "Physical Examination",
    "Vital Signs",
    "Diagnostic Studies",
    "Laboratory Results",
    "Imaging Results",
    "Differential Diagnosis",
    "Plan of Care",
    "Patient Education",
    "Goals",
    "Progress Notes",
    "Mental Status",
    "Risk Assessment",
    "Safety Plan",
    "Discharge Summary",
    "Follow-up",
    "Referrals",
    "Consent",
    "Signature",
];

const pad = (n) => String(n).padStart(2, "0");

const slugify = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const todayString = () => {
    const d = new Date();
    return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
};

const SectionColumn = ({
    title,
    items,
    search,
    onSearch,
    selected,
    onToggleItem,
    onToggleSelectAll,
    moveLabel,
    moveIcon,
    moveDisabled,
    onMove,
}) => {
    const filtered = useMemo(() => {
        const needle = search.trim().toLowerCase();
        if (!needle) return items;
        return items.filter((s) => s.toLowerCase().includes(needle));
    }, [items, search]);

    const allFilteredSelected =
        filtered.length > 0 && filtered.every((s) => selected.has(s));

    const handleSelectAll = (e) => {
        onToggleSelectAll(filtered, e.target.checked);
    };

    return (
        <div className="anf-col">
            <div className="anf-col-head">
                <span className="anf-col-title">{title}</span>
                <Checkbox
                    checked={allFilteredSelected}
                    onChange={handleSelectAll}
                    disabled={filtered.length === 0}
                >
                    Select All
                </Checkbox>
            </div>

            <Input
                placeholder="Search....."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="anf-search"
                allowClear
            />

            <div className="anf-count">
                {pad(selected.size)}/{pad(items.length)} Selected
            </div>

            <div className="anf-list">
                {filtered.length === 0 ? (
                    <div className="anf-empty">No sections</div>
                ) : (
                    filtered.map((s) => (
                        <label key={s} className="anf-item">
                            <Checkbox
                                checked={selected.has(s)}
                                onChange={() => onToggleItem(s)}
                            />
                            <span className="anf-item-label">{s}</span>
                        </label>
                    ))
                )}
            </div>

            <button
                type="button"
                className="anf-move-btn"
                disabled={moveDisabled}
                onClick={onMove}
            >
                {moveLabel === "left" ? (
                    <>
                        {moveIcon} Move
                    </>
                ) : (
                    <>
                        Move {moveIcon}
                    </>
                )}
            </button>
        </div>
    );
};

const AddNoteFormatModal = ({ open, onClose }) => {
    const [noteName, setNoteName] = useState("");
    const [available, setAvailable] = useState([...ALL_SECTIONS]);
    const [added, setAdded] = useState([]);
    const [availSelected, setAvailSelected] = useState(new Set());
    const [addedSelected, setAddedSelected] = useState(new Set());
    const [availSearch, setAvailSearch] = useState("");
    const [addedSearch, setAddedSearch] = useState("");

    const queryClient = useQueryClient();

    useEffect(() => {
        if (open) {
            setNoteName("");
            setAvailable([...ALL_SECTIONS]);
            setAdded([]);
            setAvailSelected(new Set());
            setAddedSelected(new Set());
            setAvailSearch("");
            setAddedSearch("");
        }
    }, [open]);

    const mutation = useMutation({
        mutationFn: createNoteTemplate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["noteTemplates"] });
            message.success("Note format added");
            onClose?.();
        },
        onError: (err) => {
            message.error(err?.message || "Failed to add note format");
        },
    });

    const toggleAvail = (s) => {
        setAvailSelected((prev) => {
            const next = new Set(prev);
            if (next.has(s)) next.delete(s);
            else next.add(s);
            return next;
        });
    };

    const toggleAdded = (s) => {
        setAddedSelected((prev) => {
            const next = new Set(prev);
            if (next.has(s)) next.delete(s);
            else next.add(s);
            return next;
        });
    };

    const setBulk = (setter, filtered, checked) => {
        setter((prev) => {
            const next = new Set(prev);
            filtered.forEach((s) => {
                if (checked) next.add(s);
                else next.delete(s);
            });
            return next;
        });
    };

    const moveToAdded = () => {
        if (availSelected.size === 0) return;
        setAvailable((prev) => prev.filter((s) => !availSelected.has(s)));
        setAdded((prev) => [...prev, ...Array.from(availSelected)]);
        setAvailSelected(new Set());
    };

    const moveToAvailable = () => {
        if (addedSelected.size === 0) return;
        setAdded((prev) => prev.filter((s) => !addedSelected.has(s)));
        setAvailable((prev) => {
            const merged = [...prev, ...Array.from(addedSelected)];
            return ALL_SECTIONS.filter((s) => merged.includes(s));
        });
        setAddedSelected(new Set());
    };

    const handleSubmit = () => {
        if (!noteName.trim()) {
            message.warning("Note name is required");
            return;
        }
        const today = todayString();
        mutation.mutate({
            name: noteName.trim(),
            slug: slugify(noteName),
            createdBy: "Kristin Watson",
            createdOn: today,
            updatedOn: today,
            status: "Active",
            sections: added,
        });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={780}
            title={null}
            closable={false}
            destroyOnClose
            className="anf-modal"
            style={{ top: 30 }}
        >
            <div className="anf-modal-head">
                <span className="anf-modal-title">Add New Note Format</span>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={onClose}
                    className="anf-modal-close"
                    aria-label="Close"
                />
            </div>

            <div className="anf-name-field">
                <label className="anf-name-label">Note Name</label>
                <Input
                    placeholder="Enter Note Name"
                    value={noteName}
                    onChange={(e) => setNoteName(e.target.value)}
                />
            </div>

            <div className="anf-transfer">
                <SectionColumn
                    title="All Sections"
                    items={available}
                    search={availSearch}
                    onSearch={setAvailSearch}
                    selected={availSelected}
                    onToggleItem={toggleAvail}
                    onToggleSelectAll={(filtered, checked) =>
                        setBulk(setAvailSelected, filtered, checked)
                    }
                    moveLabel="right"
                    moveIcon={<ArrowRightOutlined />}
                    moveDisabled={availSelected.size === 0}
                    onMove={moveToAdded}
                />

                <div className="anf-arrows">
                    <button
                        type="button"
                        className="anf-arrow-btn"
                        onClick={moveToAdded}
                        disabled={availSelected.size === 0}
                        aria-label="Move to added"
                    >
                        <ArrowRightOutlined />
                    </button>
                    <button
                        type="button"
                        className="anf-arrow-btn"
                        onClick={moveToAvailable}
                        disabled={addedSelected.size === 0}
                        aria-label="Move to available"
                    >
                        <ArrowLeftOutlined />
                    </button>
                </div>

                <SectionColumn
                    title="Added Sections"
                    items={added}
                    search={addedSearch}
                    onSearch={setAddedSearch}
                    selected={addedSelected}
                    onToggleItem={toggleAdded}
                    onToggleSelectAll={(filtered, checked) =>
                        setBulk(setAddedSelected, filtered, checked)
                    }
                    moveLabel="left"
                    moveIcon={<ArrowLeftOutlined />}
                    moveDisabled={addedSelected.size === 0}
                    onMove={moveToAvailable}
                />
            </div>

            <div className="anf-modal-footer">
                <Button className="anf-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="anf-submit-btn"
                    onClick={handleSubmit}
                    loading={mutation.isPending}
                >
                    Save & Add Note
                </Button>
            </div>
        </Modal>
    );
};

export default AddNoteFormatModal;
