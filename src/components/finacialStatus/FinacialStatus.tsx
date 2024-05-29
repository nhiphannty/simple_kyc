import { EInputType } from "../../common/enums/CommonEnums";
import { MultipleOptionWithInputOptionType } from "../../common/types/PropsTypes";
import MultipleOptionWithInput from "../common/MultipleOptionWithInput";

const options: MultipleOptionWithInputOptionType[] = [
    {
        label: "Salary",
        inputName: "salary",
        inputType: EInputType.Number,
    },
];

const FinacialStatus = () => {
    return (
        <>
            <MultipleOptionWithInput options={options} />
        </>
    );
};

export default FinacialStatus;
