import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./Menu.styles.css";

const Menu = (props) => {
  const { label, path } = props;
  const { pathname } = useLocation();
  const activeRoute = pathname.split("/");
  const activeMenu = path.split("/");

  return (
    <li className={activeRoute[1] === activeMenu[[1]] ? "active-menu" : ""}>
      <Link to={path}>
        <div className="flex px-2 py-1.5 items-center">
          {label == "Dashboard" ? (
            <svg
              className="h-5 w-5 text-gray-200"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="13" r="2" />
              <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
              <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-gray-200"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}

          <span className="ml-2">{label}</span>
        </div>
      </Link>
    </li>
  );
};

Menu.propTypes = {
  label: PropTypes.node.isRequired,
  path: PropTypes.node.isRequired,
};

export default Menu;
