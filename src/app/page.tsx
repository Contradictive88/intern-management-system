import Sidebar from './components/Sidebar';
import Profile from './pages/profile';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
     <div className="flex-grow p-4">
      <Profile />
     </div>
    </div>
  );
}
