import AddExpenses from "@/components/Card/AddExpenses";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
    return (
        <div className="flex-1 w-full flex flex-col gap-10 items-center">
            <Navbar />
            <div>
                <AddExpenses />
            </div>
        </div>
    );
}
