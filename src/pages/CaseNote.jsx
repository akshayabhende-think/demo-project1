import { useCallback, useRef } from "react";
import { Button } from "antd";
import {
    ArrowLeftOutlined,
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/templates/caseNote.css";

const TOOLBAR_BUTTONS = [
    { key: "bold", icon: <BoldOutlined />, command: "bold" },
    { key: "italic", icon: <ItalicOutlined />, command: "italic" },
    { key: "underline", icon: <UnderlineOutlined />, command: "underline" },
    { key: "left", icon: <AlignLeftOutlined />, command: "justifyLeft" },
    { key: "center", icon: <AlignCenterOutlined />, command: "justifyCenter" },
    { key: "right", icon: <AlignRightOutlined />, command: "justifyRight" },
    { key: "list", icon: <UnorderedListOutlined />, command: "insertUnorderedList" },
];

const RichTextEditor = () => {
    const editorRef = useRef(null);

    const exec = useCallback((command) => {
        editorRef.current?.focus();
        document.execCommand(command, false);
    }, []);

    return (
        <div className="cn-editor">
            <div className="cn-toolbar">
                {TOOLBAR_BUTTONS.map(({ key, icon, command }) => (
                    <button
                        key={key}
                        type="button"
                        className="cn-toolbar-btn"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => exec(command)}
                        aria-label={key}
                    >
                        {icon}
                    </button>
                ))}
            </div>
            <div
                ref={editorRef}
                className="cn-editor-area"
                contentEditable
                suppressContentEditableWarning
            />
        </div>
    );
};

const CaseNote = () => {
    const navigate = useNavigate();

    return (
        <div className="cn-page">
            <div className="cn-header">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    className="cn-back-btn"
                    onClick={() => navigate("/settings")}
                    aria-label="Back"
                />
                <span className="cn-title">Case Note</span>
            </div>

            <div className="cn-section">
                <div className="cn-section-head">Data</div>
                <RichTextEditor />
            </div>

            <div className="cn-section">
                <div className="cn-section-head">Assessment</div>
                <RichTextEditor />
            </div>
        </div>
    );
};

export default CaseNote;
