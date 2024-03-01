import PropTypes from "prop-types";

const Input = (props) => {
  const { onChange, placeholder, value, type, name, htmlFor, label } = props;
  return (
    <>
    <label htmlFor={htmlFor}>{label}</label>
    <input
      className="h-10 border mt-1 px-4 w-full bg-gray-50 focus:outline-none"
      autoComplete="off"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />    
    </>

  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,  
};

export default Input;
