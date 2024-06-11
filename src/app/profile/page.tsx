import Layout from '../components/Layout';
import PersonalInformationForm from '../components/profile/PersonalInfomationForm';
import ContactDetailsForm from '../components/profile/ContactDetailsForm';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';

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
