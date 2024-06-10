import Layout from '../components/Layout';

const Profile: React.FC = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-y-6 w-full">
                <div className="grid grid-cols-1 text-center rounded-lg shadow-lg border m-4 p-4">
                    <span className="text-3xl font-bold">Personal Information</span>
                    <form className="grid grid-cols-3">
                        <div>
                            <label>First Name</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Middle Name</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Place of Birth</label>
                            <input type="text"></input>
                        </div>
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
                        <div>
                            <label>Department</label>
                            <input type="text"></input>
                        </div>
                    </form>
                </div>
                <div className="grid grid-cols-1 text-center rounded-lg shadow-lg border m-4 p-4">
                    <span className="text-3xl font-bold">Contact Details</span>
                    <form className="grid grid-cols-3">
                        <div>
                            <label>Email</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Recovery Email</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Emergency Contact Name</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Emergency Contact Number</label>
                            <input type="text"></input>
                        </div>
                    </form>
                </div>
                <div className="grid grid-cols-1 text-center rounded-lg shadow-lg border m-4 p-4">
                    <span className="text-3xl font-bold">Contact Details</span>
                    <form className="grid grid-cols-3">
                        <div>
                            <label>Old Password</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>New Password</label>
                            <input type="text"></input>
                        </div>
                        <div>
                            <label>Confirm New Password</label>
                            <input type="text"></input>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
