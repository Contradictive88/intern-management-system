import Layout from '../../components/Layout';
import PersonalInformationForm from '../../components/Profile/PersonalInfomationForm';
import ContactDetailsForm from '../../components/Profile/ContactDetailsForm';
import ChangePasswordForm from '../../components/Profile/ChangePasswordForm';

const Profile: React.FC = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-y-6 w-full">
                <PersonalInformationForm />
                <ContactDetailsForm />
                <ChangePasswordForm />
            </div>
        </Layout>
    );
};

export default Profile;
