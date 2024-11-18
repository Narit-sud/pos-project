import { Outlet } from "react-router-dom";

function ProductPage() {
    return (
        <div className="flex h-[92vh] flex-col">
            <Outlet />
        </div>
    );
}

export default ProductPage;
