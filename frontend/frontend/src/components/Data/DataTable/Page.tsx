"use client";

import React from "react";

import { Columns } from "./Columns";
import { DataTable } from "./Data-table";

import getData from "@/lib/data/get-data";

export default async function DataComponent() {
    React.useEffect(() => {
        getData();

        // Set up a timer to fetch data every 5 seconds (adjust as needed)
        const intervalId = setInterval(getData, 5000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // The
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Recent Activity</h1>
            <DataTable columns={Columns} data={data} />
        </div>
    );
}
