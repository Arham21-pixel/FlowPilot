import { Link } from 'react-router-dom';
import { LayoutDashboard, Settings, History, PlusSquare } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <LayoutDashboard className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/builder" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <PlusSquare className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span className="ml-3">New Workflow</span>
            </Link>
          </li>
          <li>
            <Link to="/history" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <History className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span className="ml-3">Run History</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
              <Settings className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default Sidebar;
