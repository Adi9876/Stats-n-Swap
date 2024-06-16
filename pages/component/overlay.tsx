
const Overlay =({ children, isOverlayVisible, setOverlayVisible }: { children: any, isOverlayVisible: any, setOverlayVisible: any }) => {

    const toggleOverlay = () => {
        setOverlayVisible(!isOverlayVisible);
    };

    return (
        // <div className="h-full w-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-80 backdrop-filter backdrop-blur-s">
            <div className="w-3/5 h-4/5 bg-gray-900 p-4 rounded-lg shadow-lg">
                <button
                    className="top-0 left-0 text-red-600 hover:text-gray-100 border border-white pl-1 pr-1 rounded bg-gray-100 hover:bg-red-600"
                    onClick={toggleOverlay}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Overlay;


