import { Modal, Button } from "antd";
import {
    FilePdfOutlined,
    MailOutlined,
    CloseOutlined,
    QrcodeOutlined,
} from "@ant-design/icons";
import "../../styles/billing/cms1500Modal.css";

const InsuranceCol = ({ label, sub, checked }) => (
    <div className="cms-ins-col">
        <label className="cms-ins-check">
            <input type="checkbox" defaultChecked={checked} />
            <span className="cms-ins-name">{label}</span>
        </label>
        {sub && <div className="cms-ins-sub">{sub}</div>}
    </div>
);

const FieldBox = ({ num, label, children, className = "" }) => (
    <div className={`cms-box ${className}`}>
        <div className="cms-box-label">
            {num && <span className="cms-box-num">{num}.</span>}
            <span>{label}</span>
        </div>
        <div className="cms-box-content">{children}</div>
    </div>
);

const GenerateCms1500Modal = ({ open, onClose, record }) => {
    const handleExport = () => { /* console.log("Export CMS1500 PDF", record); */ };
    const handleEmail = () => { /* console.log("Email CMS1500", record); */ };
    const handleSave = () => {
        // console.log("Save CMS1500 to patient chart", record);
        onClose?.();
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
            className="cms-modal"
            style={{ top: 20 }}
        >
            <div className="cms-modal-head">
                <span className="cms-modal-title">Generate CMS 1500</span>
                <div className="cms-modal-head-right">
                    <Button
                        icon={<FilePdfOutlined />}
                        className="cms-head-btn"
                        onClick={handleExport}
                    >
                        Export PDF
                    </Button>
                    <Button
                        icon={<MailOutlined />}
                        className="cms-head-btn"
                        onClick={handleEmail}
                    >
                        Send to Email
                    </Button>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        className="cms-modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    />
                </div>
            </div>

            <div className="cms-form-frame">
                <div className="cms-form-top">
                    <div className="cms-qr">
                        <QrcodeOutlined />
                    </div>
                    <div className="cms-form-title">
                        <h2>HEALTH INSURANCE CLAIM FORM</h2>
                        <p>APPROVED BY NATIONAL CLAM COMMITTEE (NUCC) 02/12</p>
                    </div>
                    <div className="cms-pica">
                        <span>PICA</span>
                        <div className="cms-pica-cells">
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>

                <div className="cms-row cms-insurance-row">
                    <div className="cms-ins-cluster">
                        <InsuranceCol
                            label="MEDICARE"
                            sub="Medicare"
                            checked
                        />
                        <InsuranceCol label="MEDICAID" sub="Medicaid" />
                        <InsuranceCol label="TRICARE" sub="Tmerevica" />
                        <InsuranceCol label="CHAMPVA" sub="Theacare" />
                        <InsuranceCol label="GROUP HEALTH PLAN" sub="(04)" />
                        <InsuranceCol label="FECA BLKLNG" sub="(28)" />
                        <InsuranceCol label="OTHER" sub="(0a)" />
                    </div>
                    <div className="cms-id-cell">
                        <div className="cms-cell-label">
                            9. #MOA CODES (OS=#NABE 12 NUMBER
                        </div>
                        <div className="cms-cell-sub">(For Program here 1)</div>
                    </div>
                </div>

                <div className="cms-row cms-grid-3">
                    <FieldBox num="2" label="PATIENT'S NAME (Natin Name)">
                        1EG4-TE5-MK72
                    </FieldBox>
                    <FieldBox
                        num="3"
                        label="PATIENT'S NEMENY (Niddi Initial)"
                    >
                        <span>04 | 15-1987</span>
                        <span className="cms-mf">
                            <input type="checkbox" defaultChecked /> M
                        </span>
                    </FieldBox>
                    <FieldBox
                        num="6"
                        label="INSURED'S DA NAME (First: Namen, Middle Initial)"
                    >
                        &nbsp;
                    </FieldBox>
                </div>

                <div className="cms-row cms-grid-3">
                    <FieldBox num="2" label="PATIENT'S NAME">
                        Johnson, Emily, A
                    </FieldBox>
                    <FieldBox num="4" label="PATIENT* SERLOGD CISE">
                        <span className="cms-mf">
                            <input type="checkbox" /> Yes
                        </span>
                        <span className="cms-mf">
                            <input type="checkbox" defaultChecked /> No
                        </span>
                        <span className="cms-mf">
                            <input type="checkbox" defaultChecked /> M2
                        </span>
                    </FieldBox>
                    <FieldBox
                        num="5"
                        label="INSURED'S ADDRESS (No, Street)"
                    >
                        &nbsp;
                    </FieldBox>
                </div>

                <div className="cms-row cms-grid-3">
                    <FieldBox num="4" label="PATIENT (BARGE DATE) Has DVET">
                        <span className="cms-mf">
                            <input type="checkbox" defaultChecked /> Female
                        </span>
                        <span className="cms-mf">
                            <input type="checkbox" /> Mate
                        </span>
                    </FieldBox>
                    <FieldBox num="5" label="INSURED/SIDI NUCC USE">
                        &nbsp;
                    </FieldBox>
                    <FieldBox label="CITY / STATE" className="cms-split">
                        <div className="cms-split-row">
                            <div className="cms-split-half">
                                <span className="cms-split-label">CITY</span>
                            </div>
                            <div className="cms-split-half">
                                <span className="cms-split-label">STATE</span>
                            </div>
                        </div>
                    </FieldBox>
                </div>

                <div className="cms-row cms-grid-3">
                    <FieldBox num="5" label="PATIENT'S NAME (Natin Name)">
                        Johnson, Michael R
                    </FieldBox>
                    <FieldBox label=" ">&nbsp;</FieldBox>
                    <FieldBox label="ZIP CODE / TELEPHONE" className="cms-split">
                        <div className="cms-split-row">
                            <div className="cms-split-half">
                                <span className="cms-split-label">
                                    ZIP CODE
                                </span>
                            </div>
                            <div className="cms-split-half">
                                <span className="cms-split-label">
                                    TELEPHONE (Include Area Code)
                                </span>
                                <span>(&nbsp;&nbsp;&nbsp;)</span>
                            </div>
                        </div>
                    </FieldBox>
                </div>

                <div className="cms-row cms-grid-3">
                    <FieldBox
                        num="7"
                        label="PATIENT'S ADDRESS Area, Pelas (Less, Modle Initial)"
                    >
                        &nbsp;
                    </FieldBox>
                    <FieldBox num="8" label="INSURED'S CONDITION RELATED TO:">
                        &nbsp;
                    </FieldBox>
                    <FieldBox num="11" label="INSURED'S POLICY / GROUP NUMBER">
                        &nbsp;
                    </FieldBox>
                </div>
            </div>

            <div className="cms-modal-footer">
                <Button className="cms-cancel-btn" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    type="primary"
                    className="cms-save-btn"
                    onClick={handleSave}
                >
                    Save to Patient Chart
                </Button>
            </div>
        </Modal>
    );
};

export default GenerateCms1500Modal;
