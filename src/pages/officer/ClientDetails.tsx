import { Breadcrumb, Tabs, TabsProps } from "antd";
import PersonalInformation from "../../components/personalInformation/PersonalInformation";
import FinacialStatus from "../../components/finacialStatus/FinacialStatus";
import { ESubmissionState } from "../../common/enums/CommonEnums";
import useLocalStorage from "../../hooks/useLocalStorage";
import LocalStorageKey from "../../common/constants/LocalStorageKeys";
import DefaultLayout from "../../components/common/layout/Layout";
import { BasicInforType } from "../../common/types/DataTypes";
import EntityName from "../../common/constants/EntityName";
import ProcessResult from "../../components/result/ProcessResult";

const ClientDetails = () => {
    const [submission, setSubmission] = useLocalStorage<ESubmissionState>(LocalStorageKey.SubmissionState, ESubmissionState.NotSubmittedYet);
    const [basicInfor] = useLocalStorage<BasicInforType>(EntityName.BasicInfor);
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
            label: "Proceed Result",
            children: <ProcessResult />,
            disabled: submission === ESubmissionState.NotSubmittedYet,
        },
    ];

    return (
        <DefaultLayout>
            <Breadcrumb
                items={[
                    {
                        title: "Clients",
                        href: "/clients",
                    },
                    {
                        title: `${basicInfor.firstName} ${basicInfor.lastName}`,
                    },
                ]}
                style={{ marginBottom: "2em" }}
            />
            <Tabs
                defaultActiveKey="1"
                items={items}
            />
        </DefaultLayout>
    );
};

export default ClientDetails;
