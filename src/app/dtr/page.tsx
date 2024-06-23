import Layout from '../../components/Layout';
import Timer from '../../components/Dtr/Timer';
import DtrRecordsTable from '../../components/Dtr/DtrRecordsTable';

const Dtr: React.FC = () => {
    return (
        <Layout>
            <div>
                <Timer/>
                <DtrRecordsTable/>
            </div>
        </Layout>
    );
};

export default Dtr;