import { EInputType } from '../enums/CommonEnums'

type MultipleOptionWithInputOptionType = {
    label: string;
    inputName: string;
    inputType: EInputType;
    rules?: any;
};

type DynamicInputPropType = {
    isRequired: boolean;
    isReadOnlyMode: boolean;
}

export type { MultipleOptionWithInputOptionType, DynamicInputPropType };