import { Tabs, TabsProps } from "antd";
import PersonalInformation from "../../components/personalInformation/PersonalInformation";
import UserLayout from "../../components/UserLayout";
import FinacialStatus from "../../components/finacialStatus/FinacialStatus";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ESubmissionState } from "../../common/enums/CommonEnums";
import LocalStorageKey from "../../common/constants/LocalStorageKeys";
import SubmissionResult from "../../components/result/SubmissionResult";

function KYC() {
    const [submission] = useLocalStorage<ESubmissionState>(LocalStorageKey.SubmissionState, ESubmissionState.NotSubmittedYet);
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Personal Information",
            children: <PersonalInformation isReadOnlyMode={true} />,
        },
        {
            key: "2",
            label: "Financial Status",
            children: <FinacialStatus />,
        },
        {
            key: "3",
            label: "Result",
            children: <SubmissionResult />,
            disabled: submission === ESubmissionState.NotSubmittedYet,
        },
    ];
    return (
        <UserLayout>
            <Tabs
                defaultActiveKey={submission !== ESubmissionState.NotSubmittedYet ? "3" : "2"}
                items={items}
            />
        </UserLayout>
    );
}

export default KYC;
