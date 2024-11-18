import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="flex h-screen w-screen flex-col overflow-hidden">
            <div>
                <Navbar />
            </div>
            <div className="max-h-[92vh] flex-grow">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
