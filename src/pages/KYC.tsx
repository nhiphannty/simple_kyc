import PersonalInformation from "../components/profile/PersonalInformation";
import UserLayout from "../components/UserLayout";

function KYC() {
    return (
        <UserLayout>
            <PersonalInformation isReadOnlyMode={true} />
        </UserLayout>
    );
}

export default KYC;
