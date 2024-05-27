import { Button, Divider } from "antd";
import UserLayout from "../components/UserLayout";
import PersonalInformation from "../components/profile/PersonalInformation";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    return (
        <UserLayout>
            <PersonalInformation isReadOnlyMode={false} />
            <Divider />
            <Button
                type="primary"
                block
                onClick={() => navigate("/kyc")}>
                Go to KYC
            </Button>
        </UserLayout>
    );
}

export default Profile;
