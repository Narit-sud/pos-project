import { useState, useEffect } from "react";
import ReportCard from "../report/ReportCard";
import salesService from "../../service/salesService";
import SaleReportItem from "./SaleReportItem";

function SalesReport() {
    const [allSales, setAllSales] = useState([]);
    const [filter, setFilter] = useState({ date: "", customer: "" });
    const [displayingSales, setDisplayingSales] = useState([]);

    const loadSales = async () => {
        const res = await salesService.getAllSales();
        setAllSales(res);
        setDisplayingSales(res);
        setFilter({ date: "", customer: "" });
    };

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        setFilter((prev) => ({ ...prev, [id]: value }));
    };

    const grossSales = displayingSales.reduce((acc, sale) => {
        return acc + sale.total;
    }, 0);

    const allDiscount = displayingSales.map((sale) => {
        return sale.discount;
    });

    const discounts = allDiscount.reduce((acc, discount) => {
        return acc + discount;
    }, 0);

    useEffect(() => {
        loadSales();
    }, []);

    useEffect(() => {
        if (filter.date === "" && filter.customer === "") {
            setDisplayingSales(allSales);
        } else {
            const dateFiltered = allSales.filter((sale) =>
                sale.date.includes(filter.date),
            );
            const customerFiltered = dateFiltered.filter(
                (sale) => sale.customer === filter.customer,
            );
            setDisplayingSales(customerFiltered);
        }
    }, [filter]);
    return (
        <div className="h-[80vh] overflow-y-scroll rounded-xl border-2 p-2">
            <div className="flex justify-center gap-10">
                <span className="p-2 text-lg font-bold">Filter by date</span>
                <input
                    type="date"
                    id="date"
                    value={filter.date}
                    onChange={handleFilterChange}
                    className="rounded-lg border p-2 text-center"
                />
            </div>
            <div className="flex w-full overflow-x-scroll sm:justify-center">
                <div className="m-1 flex w-fit">
                    <ReportCard text="Gross Sales" amount={grossSales} />
                    <ReportCard text="Total Discount" amount={discounts} />
                    <ReportCard
                        text="Net Sales"
                        amount={grossSales - discounts}
                    />
                </div>
            </div>
            <div className="mt-4 w-full overflow-x-scroll rounded-lg border">
                <div className="grid grid-cols-6 py-2 text-center font-bold max-md:w-[500px]">
                    <span className="col-span-2">Date</span>
                    <span>Customer</span>
                    <span>Items</span>
                    <span>Discount</span>
                    <span>Total</span>
                </div>
                <div>
                    {allSales.map((sale) => {
                        return <SaleReportItem key={sale.id} sale={sale} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default SalesReport;
