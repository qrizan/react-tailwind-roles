import PropTypes from "prop-types";

const Alert = (props) => {
  const { text } = props;
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative m-5"
      role="alert"
    >
      <span className="block sm:inline">{text}</span>
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Alert;
