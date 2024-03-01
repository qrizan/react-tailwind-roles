import PropTypes from "prop-types";

const Checkbox = (props) => {
  const { value, label, onChange, id, defaultChecked, htmlFor } = props;
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4"
        value={value}
        onChange={onChange}
        id={id}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={htmlFor} className="text-sm ml-3 font-medium text-gray-900">
       {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Checkbox;
