import dayjs from "dayjs";
import { ESubmissionState } from "../enums/CommonEnums";
import { ResultStatusType } from "antd/es/result";

type BasicInforType = {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: dayjs.Dayjs;
    age: number;
    addresses: [];
    emails: [];
    phones: [];
};

type EmploymentType = {
    employments: {
        name: string;
        duration: dayjs.Dayjs[];
    }[];
};

type SubmissionResultContentType = {
    Value: ESubmissionState,
    Status: ResultStatusType | undefined,
    Title: string
}

type ClientItemType = {
    key: string;
    name: string;
    dateOfBirth: string;
    state: string | undefined;
};

export type { BasicInforType, EmploymentType, SubmissionResultContentType, ClientItemType };