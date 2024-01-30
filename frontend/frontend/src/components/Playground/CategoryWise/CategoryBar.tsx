"use client";

import { useEffect, useState } from "react";
import { BarList, Bold, Flex, Text, Title } from "@tremor/react";
import {
    Card,
    CardFooter,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CategoryAnalytics() {
    const [categoryData, setCategoryData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState("");

    useEffect(() => {
        async function fetchCategoryData() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/category_analytics"
                );
                const data = await response.json();
                const categoryExpenseData = data.category_expense;

                // Transform data into the format accepted by BarList component
                const formattedData: any = Object.keys(categoryExpenseData).map(
                    (category) => ({
                        name: category,
                        value: parseFloat(categoryExpenseData[category]),
                    })
                );

                setCategoryData(formattedData);
                setTotalExpenses(data.total_expenses);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        fetchCategoryData();
    }, []);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
                <Flex className="mt-4">
                    <Text>
                        <Bold>Category</Bold>
                    </Text>
                    <Text>
                        <Bold>Expense</Bold>
                    </Text>
                </Flex>
                <BarList data={categoryData} className="mt-2" />
            </CardContent>
            <CardFooter>
                <Text>Total Expenses: {totalExpenses}</Text>
            </CardFooter>
        </Card>
    );
}
