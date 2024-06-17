import Layout from '../../components/Layout';
import PersonalInformationForm from '../../components/Profile/PersonalInfomationForm';
import ContactDetailsForm from '../../components/Profile/ContactDetailsForm';
import ChangePasswordForm from '../../components/Profile/ChangePasswordForm';
import { UserProvider } from '../../context/UserContext';
import { EditViewModeProvider } from '../../context/EditViewModeContext';
import EditViewSwitch from '../../components/EditViewSwitch';

const Profile: React.FC = () => {
    return (
        <Layout>
            <EditViewModeProvider>
                <EditViewSwitch />
                <div className="grid grid-cols-1 gap-y-6 w-full">
                    <UserProvider>
                        <PersonalInformationForm />
                        <ContactDetailsForm />
                        <ChangePasswordForm />
                    </UserProvider>
                </div>
            </EditViewModeProvider>
        </Layout>
    );
};

export default Profile;
