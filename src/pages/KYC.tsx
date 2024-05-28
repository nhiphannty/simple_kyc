import { Tabs, TabsProps } from "antd";
import PersonalInformation from "../components/personalInformation/PersonalInformation";
import UserLayout from "../components/UserLayout";
import FinacialStatus from "../components/finacialStatus/FinacialStatus";

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
];

function KYC() {
    return (
        <UserLayout>
            <Tabs
                defaultActiveKey="1"
                items={items}
            />
        </UserLayout>
    );
}

export default KYC;
