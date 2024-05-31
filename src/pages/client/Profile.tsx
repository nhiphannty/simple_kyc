import { Button, Divider, message } from "antd";
import UserLayout from "../../components/common/layout/UserLayout";
import PersonalInformation from "../../components/personalInformation/PersonalInformation";
import { useNavigate } from "react-router-dom";
import { InvalidProfileData } from "../../utils/Messages";

function Profile() {
    const navigate = useNavigate();

    const goToKYC = () => {
        if (isProfileValid()) navigate("/kyc");
        else message.error(InvalidProfileData);
    };

    const isProfileValid = (): boolean => {
        return true;
    };

    return (
        <UserLayout>
            <PersonalInformation isReadOnlyMode={false} />
            <Divider />
            <Button
                type="primary"
                block
                onClick={goToKYC}>
                Go to KYC
            </Button>
        </UserLayout>
    );
}

export default Profile;
