import { ESubmissionState } from "../enums/CommonEnums";
import { SubmissionResultContentType } from "../types/DataTypes";

const SubmissionResultContent: SubmissionResultContentType[] = [
    {
        Value: ESubmissionState.Submitted,
        Status: undefined,
        Title: "Your profile is being reviewed."
    },
    {
        Value: ESubmissionState.Approved,
        Status: "success",
        Title: "Your profile has been approved."
    },
    {
        Value: ESubmissionState.Rejected,
        Status: "error",
        Title: "Your profile has been rejected."
    }
]

export default SubmissionResultContent;