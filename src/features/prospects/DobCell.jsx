import { memo, useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const ICON_STYLE = { color: "#9ca3af", cursor: "pointer" };
const WRAPPER_STYLE = { display: "inline-flex", alignItems: "center", gap: 6 };

const maskDob = (dob) => {
    const parts = String(dob).split("/");
    return `**/**/${parts[parts.length - 1]}`;
};

const DobCell = ({ dob }) => {
    const [visible, setVisible] = useState(false);

    if (!dob) return "-";

    const ToggleIcon = visible ? EyeInvisibleOutlined : EyeOutlined;

    return (
        <span style={WRAPPER_STYLE}>
            {visible ? dob : maskDob(dob)}
            <ToggleIcon style={ICON_STYLE} onClick={() => setVisible((v) => !v)} />
        </span>
    );
};

export default memo(DobCell);
