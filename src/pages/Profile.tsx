import { Tabs, TabsProps } from "antd";
import UserLayout from "../components/UserLayout";
import { UserOutlined, IdcardOutlined, FolderOpenOutlined, AuditOutlined } from "@ant-design/icons";
import BasicInfor from "../components/profile/BasicInfor";

const items: TabsProps["items"] = [
    {
        label: "Overview",
        key: "overview",
        icon: <AuditOutlined />,
        children: <h3>Overview</h3>,
    },
    {
        label: "Basic Information",
        key: "basic",
        icon: <UserOutlined />,
        children: <BasicInfor />,
    },
    {
        label: "Identification Documents",
        key: "identification",
        icon: <IdcardOutlined />,
    },
    {
        label: "Employment Information",
        key: "employment",
        icon: <FolderOpenOutlined />,
    },
];

function Profile() {
    return (
        <UserLayout>
            <Tabs
                defaultActiveKey="overview"
                items={items}
            />
        </UserLayout>
    );
}

export default Profile;
