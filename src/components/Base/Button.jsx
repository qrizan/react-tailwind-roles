import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const ButtonDelete = ({ onClick }) => {
  return (
    <button className="    
    px-3 py-1 
    text-sm 
    bg-white 
    text-red-400
    hover:text-red-600" onClick={onClick}>
      Delete
    </button>
  );
};

export const ButtonEdit = ({ linkTo }) => {
  return (
    <Link to={linkTo} 
    className="
    px-3 py-1 
    text-sm 
    bg-white 
    text-green-600
    hover:text-green-800">
      Edit
    </Link>
  );
};

export const ButtonAdd = ({ linkTo }) => {
  return (
      <Link to={linkTo}>
      <button className="
      flex-none 
      px-3.5 py-2.5 text-sm 
      bg-indigo-500 
      font-semibold 
      text-white shadow-sm 
      hover:bg-indigo-400 
      focus-visible:outline 
      focus-visible:outline-2 
      focus-visible:outline-offset-2 
      focus-visible:outline-indigo-500">Add New
      </button>
      </Link>
  );
};

export const ButtonReset = ({ onClick }) => {
  return (
      <button 
      onClick={onClick}
      className="
        flex-none 
        bg-white px-3.5 py-2.5 text-sm border
        font-semibold 
        text-indigo-500 
        shadow-sm hover:bg-gray-100 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        focus-visible:outline-indigo-500 mr-3">Reset
      </button>
  );
};

export const ButtonBack = ({ linkTo }) => {
  return (

      <Link to={linkTo}>
      <button className="
      flex-none 
      px-3.5 py-2.5 text-sm 
      bg-orange-400 
      font-semibold 
      text-white shadow-sm 
      hover:bg-orange-300 
      focus-visible:outline 
      focus-visible:outline-2 
      focus-visible:outline-offset-2 
      focus-visible:outline-orange-400">Back
      </button>
      </Link>
  );
};

export const ButtonSave = () => {
  return (
      <button 
      type="submit"
      className="
      flex-none 
      px-3.5 py-2.5 text-sm 
      bg-indigo-500 
      font-semibold 
      text-white shadow-sm 
      hover:bg-indigo-400 
      focus-visible:outline 
      focus-visible:outline-2 
      focus-visible:outline-offset-2 
      focus-visible:outline-indigo-500">Save</button>
  );
};


ButtonDelete.propTypes = {
  onClick: PropTypes.func.isRequired,
};

ButtonEdit.propTypes = {
  linkTo: PropTypes.string.isRequired,
};

ButtonAdd.propTypes = {
  linkTo: PropTypes.string.isRequired,
};

ButtonBack.propTypes = {
  linkTo: PropTypes.string.isRequired,
};

ButtonReset.propTypes = {
  onClick: PropTypes.func.isRequired,
};
