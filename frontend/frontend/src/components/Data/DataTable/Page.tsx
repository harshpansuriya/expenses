import { Payment, Columns } from "./Columns";
import { DataTable } from "./Data-table";
import { loadData } from "@/lib/data/load-data";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.

    const data = await loadData();

    const transformedData = data.map(
        (item: { id: any; price: any; date: any; name: any }) => ({
            id: item.id,
            amount: "$" + item.price,
            date: item.date,
            name: item.name,
        })
    );

    return transformedData;
}

export default async function DataComponent() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={Columns} data={data} />
        </div>
    );
}
