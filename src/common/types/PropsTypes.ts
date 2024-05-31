import { EInputType } from '../enums/CommonEnums'

type MultipleOptionWithInputOptionType = {
    label: string;
    inputName: string;
    inputType: EInputType;
    rules?: any;
    value?: any;
};

type DynamicInputPropType = {
    isRequired: boolean;
    isReadOnlyMode: boolean;
}

type PersonalInformationSectionPropType = {
    moveSection: () => void;
    isReadOnlyMode: boolean;
    setValidation: Function;
};

export type { MultipleOptionWithInputOptionType, DynamicInputPropType, PersonalInformationSectionPropType };