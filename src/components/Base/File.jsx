import PropTypes from "prop-types";

const File = (props) => {
  const { onChange, accept, refFile } = props;
  return (
      <input
        ref={refFile}
        type="file"
        accept={accept}
        onChange={onChange}
        className="
            block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
            file:border-0 file:text-sm file:font-semibold 
            file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-100 cursor-pointer"
      />
    
  );
};

File.propTypes = {
  accept: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  refFile: PropTypes.object.isRequired,
};

export default File;
