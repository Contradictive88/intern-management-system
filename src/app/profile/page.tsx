import Layout from '../components/Layout';
import InputWithLabel from '../components/InputWithLabel';

const Profile: React.FC = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-y-6 w-full">
                <div className="grid grid-cols-1 gap-y-3 rounded-lg shadow-lg border m-4 p-4">
                    <span className="text-3xl font-bold text-center mb-4">Personal Information</span>
                    <form className="grid grid-cols-3 gap-x-5">
                        <InputWithLabel 
                            label="First Name"
                            inputType="text"
                            inputName="firstName"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Middle Name"
                            inputType="text"
                            inputName="middleName"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Last Name"
                            inputType="text"
                            inputName="lastName"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Place of Birth"
                            inputType="text"
                            inputName="placeOfBirth"
                            maxLength={255}
                        />
                        <div>
                            <label>Date of Birth</label>
                            <input type="date"></input>
                        </div>
                        <div>
                            <label>Gender</label>
                            <select>
                                <option>Select a Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div>
                            <label>Internship Start Date</label>
                            <input type="date"></input>
                        </div>
                        <div>
                            <label>Internship End Date</label>
                            <input type="date"></input>
                        </div>
                        <InputWithLabel 
                            label="Department"
                            inputType="text"
                            inputName="department"
                            maxLength={255}
                        />
                    </form>
                </div>
                <div className="grid grid-cols-1 rounded-lg shadow-lg border m-4 p-4">
                    <span className="text-3xl font-bold text-center mb-4">Contact Details</span>
                    <form className="grid grid-cols-3 gap-x-5">
                        <InputWithLabel 
                            label="Email Address"
                            inputType="email"
                            inputName="emailAddress"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Recovery Email"
                            inputType="email"
                            inputName="recoveryEmail"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Phone Number"
                            inputType="text"
                            inputName="phoneNumber"
                            maxLength={13}
                        />
                        <InputWithLabel 
                            label="Emergency Contact Name"
                            inputType="text"
                            inputName="emergencyContactName"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Emergency Contact Number"
                            inputType="text"
                            inputName="emergencyContactNumber"
                            maxLength={13}
                        />
                    </form>
                </div>
                <div className="grid grid-cols-1 rounded-lg shadow-lg border m-4 p-4">
                    <span className="text-3xl font-bold text-center mb-4">Contact Details</span>
                    <form className="grid grid-cols-3 gap-x-5">
                        <InputWithLabel 
                            label="Old Password"
                            inputType="password"
                            inputName="oldPassword"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="New Password"
                            inputType="password"
                            inputName="newPassword"
                            maxLength={255}
                        />
                        <InputWithLabel 
                            label="Confirm New Password"
                            inputType="password"
                            inputName="confirmNewPassword"
                            maxLength={255}
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
