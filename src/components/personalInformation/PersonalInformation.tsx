import { Collapse, CollapseProps } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import BasicInfor from "./BasicInfor";
import IdentificationDocument from "./IdentificationDocument";
import Employment from "./Employment";
import { useState } from "react";

type PersonalInformationPropsType = {
    isReadOnlyMode: boolean;
};

function PersonalInformation({ isReadOnlyMode }: PersonalInformationPropsType) {
    const [basicInforValidation, setBasicInforValidation] = useState(false);
    const [identDocumentValidation, setIdentDocumentValidation] = useState(false);
    const [employmentsValidation, setEmploymentsValidation] = useState(true);

    const sections = ["Basic Information", "Identification Documents", "Occupation and Employment Information"];

    const [activeKey, setActiveKey] = useState(0);
    function handleClick(key: any) {
        setActiveKey(key);
    }

    const getValidationStatus = (isValid: boolean) => {
        return isReadOnlyMode ? null
            : isValid ? <CheckCircleFilled style={{ color: "#52c41a" }} /> : <CloseCircleFilled style={{ color: "#eb2f96" }} />;
    };

    const items: CollapseProps["items"] = [
        {
            label: sections[0],
            key: 0,
            children: (
                <BasicInfor
                    isReadOnlyMode={isReadOnlyMode}
                    moveSection={() => handleClick(1)}
                    setValidation={setBasicInforValidation}
                />
            ),
            extra: getValidationStatus(basicInforValidation),
        },
        {
            label: sections[1],
            key: 1,
            children: (
                <IdentificationDocument
                    isReadOnlyMode={isReadOnlyMode}
                    moveSection={() => handleClick(2)}
                    setValidation={setIdentDocumentValidation}
                />
            ),
            extra: getValidationStatus(identDocumentValidation),
        },
        {
            label: sections[2],
            key: 2,
            children: (
                <Employment
                    isReadOnlyMode={isReadOnlyMode}
                    moveSection={() => handleClick(null)}
                    setValidation={setEmploymentsValidation}
                />
            ),
            extra: getValidationStatus(employmentsValidation),
        },
    ];

    return (
        <Collapse
            items={items}
            activeKey={activeKey}
            onChange={handleClick}
            accordion
        />
    );
}

export default PersonalInformation;
