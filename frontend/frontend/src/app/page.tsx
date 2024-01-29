import AddExpenses from "@/components/Card/AddExpenses";
import Navbar from "@/components/Navbar/Navbar";
import AllStatement from "@/components/Data/AllStatement";
import DataComponent from "@/components/Data/DataTable/Page";
import Footer from "@/components/Footer/Footer";
import CategoryAnalysis from "@/components/CatagoryAnalysis/CategoryAnalysis";
import MonthlyAnalysis from "@/components/MonthlyAnalysis/MonthlyAnalysis";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col gap-10 items-center">
                <div className="grid grid-flow-col grid-cols-3 justify-items-stretch gap-4">
                    <div className="col-span-1 row-span-1">
                        <AddExpenses />
                    </div>
                    <div className="col-span-2 row-span-2">
                        <DataComponent />
                        {/* <DataComponent /> */}
                        <CategoryAnalysis />
                    </div>
                </div>
                <MonthlyAnalysis />
            </div>
            <Footer />
        </>
    );
}
