import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import PropTypes from "prop-types";


const Layout = ({ children, title }) => {
  document.title = title + ' | Administrator';
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-full w-screen">
      <Sidebar />
      <main className="p-6 bg-gray-100 w-screen">
      <div className="bg-white shadow-sm border px-6 pt-4 pb-6 mb-6">
        <h3
          className="
              text-2xl font-bold leading-6 text-gray-900 
              sm:truncate sm:text-3xl sm:tracking-tight"
            >
          {title}
        </h3>

        {children}
        </div>
      </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
