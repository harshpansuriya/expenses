"use client";

import React, { useEffect, useState } from "react";
import DowloadButton from "../Buttons/DowloadButton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Expense {
    id: string;
    name: string;
    price: number;
    description: string;
    date: string;
    category: string;
}

function MonthlyAnalysis() {
    const [data, setData] = useState<Expense[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalExpenses, setTotalExpenses] = useState<string>("0.0");
    const [month, setMonth] = useState("1");

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setMonth(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `http://localhost:8000/monthly_expenses?month=${month}`
                );
                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData.expenses);
                    setTotalExpenses(responseData.total_expenses);
                    setError(null); // Reset error state
                } else {
                    const errorData = await response.json();
                    setError(errorData.detail);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching data.");
            }
        }

        fetchData();
    }, [month]); // Add 'month' as a dependency

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Monthly Expenses</h1>
                <div className="flex items-center gap-5">
                    <select
                        value={month}
                        onChange={handleSelectChange}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    >
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    <DowloadButton />
                </div>
            </div>
            <Card>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell className="text-right">
                                        ${item.price}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>Total:</TableCell>
                                <TableCell className="text-right">
                                    ${totalExpenses}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                )}
            </Card>
        </div>
    );
}

export default MonthlyAnalysis;
