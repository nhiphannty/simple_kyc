import { Collapse, CollapseProps } from "antd";
import BasicInfor from "./BasicInfor";
import IdentificationDocument from "./IdentificationDocument";
import Employment from "./Employment";
import { useState } from "react";

type PersonalInformationPropsType = {
    isReadOnlyMode: boolean;
};

function PersonalInformation({ isReadOnlyMode }: PersonalInformationPropsType) {
    const [activeKey, setActiveKey] = useState("basic");
    function handleClick(key: any) {
        setActiveKey(key);
    }
    const items: CollapseProps["items"] = [
        {
            label: "Basic Information",
            key: "basic",
            children: (
                <BasicInfor
                    isReadOnlyMode={isReadOnlyMode}
                    moveSection={() => handleClick("identification")}
                />
            ),
        },
        {
            label: "Identification Documents",
            key: "identification",
            children: (
                <IdentificationDocument
                    isReadOnlyMode={isReadOnlyMode}
                    moveSection={() => handleClick("employment")}
                />
            ),
        },
        {
            label: "Occupation and Employment Information",
            key: "employment",
            children: (
                <Employment
                    isReadOnlyMode={isReadOnlyMode}
                    moveSection={() => handleClick(null)}
                />
            ),
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
