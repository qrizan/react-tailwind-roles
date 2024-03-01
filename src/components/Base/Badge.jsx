import PropTypes from "prop-types";

export const BadgeDefault = (props) => {
  const { text } = props;
  return (
    <span
      className="items-center bg-yellow-50 
        px-2 py-1 text-xs font-medium text-yellow-800 
        ring-1 ring-inset ring-yellow-600/20 inline-block m-0.5"
    >
      {text}
    </span>
  );
};

BadgeDefault.propTypes = {
  text: PropTypes.string.isRequired,
};
