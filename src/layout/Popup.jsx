function Popup(props) {
    const { closePopup, children } = props;
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="relative inset-0 h-fit w-[90%] rounded-lg bg-white p-10">
                <button
                    onClick={closePopup}
                    className="absolute right-3 top-2 text-center"
                >
                    <div className="relative flex h-4 w-4 items-center justify-center text-center">
                        <p className="text-xl font-extrabold text-red-500">×</p>
                    </div>
                </button>
                {children}
            </div>
        </div>
    );
}

export default Popup;
