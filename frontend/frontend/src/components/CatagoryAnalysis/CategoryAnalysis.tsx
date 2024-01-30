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

function CategoryAnalysis() {
    const [data, setData] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState<string>("0.0");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "http://localhost:8000/category_analytics"
                );
                const responseData = await response.json();
                setData(responseData.category_expense);
                setTotalExpenses(responseData.total_expenses);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">
                    Categorywise Expenses
                </h1>
                <DowloadButton />
            </div>
            <Card>
                {data && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(data).map(
                                ([category, amount]: any) => (
                                    <TableRow key={category}>
                                        <TableCell className="font-medium">
                                            {category}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${amount}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Total:</TableCell>
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

export default CategoryAnalysis;
