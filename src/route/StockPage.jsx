import { Outlet } from "react-router-dom";

function StockPage() {
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default StockPage;
