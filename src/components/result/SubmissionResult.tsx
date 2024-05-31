import { Result } from "antd";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ESubmissionState } from "../../common/enums/CommonEnums";
import LocalStorageKey from "../../common/constants/LocalStorageKeys";
import SubmissionResultContent from "../../common/constants/SubmissionResultContent";

const SubmissionResult = () => {
    const [submission] = useLocalStorage<ESubmissionState>(LocalStorageKey.SubmissionState, ESubmissionState.NotSubmittedYet);
    return (
        <Result
            status={SubmissionResultContent.find((s) => s.Value === submission)?.Status}
            title={SubmissionResultContent.find((s) => s.Value === submission)?.Title}
        />
    );
};

export default SubmissionResult;
