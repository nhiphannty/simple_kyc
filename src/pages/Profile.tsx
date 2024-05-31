import { Button, Divider, message } from "antd";
import UserLayout from "../components/UserLayout";
import PersonalInformation from "../components/personalInformation/PersonalInformation";
import { useNavigate } from "react-router-dom";
import { BasicInforType } from "../common/types/DataTypes";
import useLocalStorage from "../hooks/useLocalStorage";
import EntityName from "../common/constants/EntityName";
import { InvalidProfileData } from "../utils/Messages";

function Profile() {
    const [basicInfor] = useLocalStorage<BasicInforType>(EntityName.BasicInfor);
    const [identDocument] = useLocalStorage(EntityName.IdentDocument);
    const navigate = useNavigate();

    const goToKYC = () => {
        if (isProfileValid()) navigate("/kyc");
        else message.error(InvalidProfileData);
    };

    const isProfileValid = (): boolean => {
        return basicInfor !== undefined && basicInfor.firstName !== undefined && identDocument !== undefined;
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
