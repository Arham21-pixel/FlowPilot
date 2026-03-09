import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-50 top-0 left-0">
      <div className="flex flex-wrap justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">SmartFlow</span>
        </Link>
        <div className="flex items-center lg:order-2">
          {/* User Profile or Login buttons can go here */}
          <Link to="/login" className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Log in</Link>
          <Link to="/signup" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
