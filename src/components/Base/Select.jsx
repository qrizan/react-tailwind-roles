import PropTypes from "prop-types";

const Select = (props) => {
  const { options, value, onChange } = props;
  return (
    <>
      <label className="form-label fw-bold">Category</label>
      <select
        value={value}
        onChange={onChange}
        className="form-select appearance-none block w-full px-3 py-1.5
      text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300 transition ease-in-out m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

Select.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;
