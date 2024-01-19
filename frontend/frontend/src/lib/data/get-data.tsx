import { loadData } from "@/lib/data/load-data";
import { Payment } from "@/components/Data/DataTable/Columns";

export default async function getData(): Promise<Payment[]> {
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
