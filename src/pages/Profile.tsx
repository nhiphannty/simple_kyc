import { Tabs, TabsProps } from "antd";
import UserLayout from "../components/UserLayout";
import { UserOutlined, IdcardOutlined, FolderOpenOutlined, AuditOutlined } from "@ant-design/icons";
import BasicInfor from "../components/profile/BasicInfor";
import IdentificationDocument from "../components/profile/IdentificationDocument";
import Employment from "../components/profile/Employment";

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
        children: <IdentificationDocument />,
    },
    {
        label: "Employment Information",
        key: "employment",
        icon: <FolderOpenOutlined />,
        children: <Employment />,
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
