import { Outlet } from "react-router-dom";

function ReportPage() {
    return (
        <div className="p-2">
            <h1 className="text-3xl font-bold text-gray-500">Sales Report</h1>
            <div className="mt-2">
                <Outlet />
            </div>
        </div>
    );
}

export default ReportPage;
