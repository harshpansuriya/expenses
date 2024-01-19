import AddExpenses from "@/components/Card/AddExpenses";
import Navbar from "@/components/Navbar/Navbar";
import AllStatement from "@/components/Data/AllStatement";
import DataComponent from "@/components/Data/DataTable/Page";

export default function Home() {
    return (
        <div className="flex-1 w-full flex flex-col gap-10 items-center">
            <Navbar />
            <div className="grid grid-rows-3 grid-flow-col grid-cols-3 justify-items-stretch gap-4">
                <div className="col-span-1 row-span-1">
                    <AddExpenses />
                </div>
                <div className=""></div>
                <div className="col-span-2 row-span-2">
                    <DataComponent />
                </div>
            </div>
        </div>
    );
}
