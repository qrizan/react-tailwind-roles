import PropTypes from "prop-types";

export const ModalDelete = (props) => {
  const { showModalDelete, setShowModalDelete, onClick } = props;

  const hideModal =  () => setShowModalDelete(false)
  
  return (
    showModalDelete && (
      <>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={hideModal}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white shadow-lg">
              <div className="mt-3 flex">
                <div className="m-2 text-left ml-4 w-full">
                  <h4 className="text-lg font-medium text-gray-800">Are You Sure ?</h4>
                  <p className="mt-2 text-[25px] leading-relaxed text-gray-500">
                    want to delete this data ?
                  </p>
                  <div className="items-center gap-2 mt-3 flex">
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={hideModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 outline-none ring-offset-2 ring-red-600 focus:ring-2"
                      onClick={onClick}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

ModalDelete.propTypes = {
  setShowModalDelete: PropTypes.func.isRequired,
  showModalDelete: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

