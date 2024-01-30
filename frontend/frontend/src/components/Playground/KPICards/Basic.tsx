"use client";

import React, { useState, useEffect } from "react";
import {
    BadgeDelta,
    Card,
    DeltaType,
    Flex,
    Grid,
    Metric,
    ProgressBar,
    Text,
} from "@tremor/react";

type Kpi = {
    title: string;
    metric: string;
    progress: number;
    target: string;
    delta: string;
    deltaType: DeltaType;
};

// Initialize kpiData with default values
const initialKpiData: Kpi[] = [
    {
        title: "Total",
        metric: "$ 12,699",
        progress: 15.9,
        target: "$ 80,000",
        delta: "13.2%",
        deltaType: "moderateIncrease",
    },
    {
        title: "Profit",
        metric: "$ 45,564",
        progress: 60.5,
        target: "$ 125,000",
        delta: "23.9%",
        deltaType: "increase",
    },
    {
        title: "Customer1s",
        metric: "1,072",
        progress: 53.6,
        target: "2,000",
        delta: "10.1%",
        deltaType: "moderateDecrease",
    },
    {
        title: "Customers",
        metric: "1,072",
        progress: 53.6,
        target: "2,000",
        delta: "10.1%",
        deltaType: "decrease",
    },
];

export default function Basic() {
    const [totalExpenses, setTotalExpenses] = useState("0.0");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/current_month"
                );
                const data = await response.json();
                setTotalExpenses(data.total_expenses);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const customerData: any = 10;

    // Update the target of the Total KPI with the total expenses
    const updatedKpiData = initialKpiData.map((kpi, index) => ({
        ...kpi,
        metric:
            kpi.title === "Total"
                ? `$ ${totalExpenses}`
                : kpi.title === "Customers"
                ? `$ ${customerData}`
                : kpi.metric,
    }));

    return (
        <div>
            <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
                {updatedKpiData.map((item) => (
                    <Card key={item.title}>
                        <Flex alignItems="start">
                            <div className="truncate">
                                <Text>{item.title}</Text>
                                <Metric className="truncate">
                                    {item.metric}
                                </Metric>
                            </div>
                            <BadgeDelta deltaType={item.deltaType}>
                                {item.delta}
                            </BadgeDelta>
                        </Flex>
                        <Flex className="mt-4 space-x-2">
                            <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                            <Text className="truncate">{item.target}</Text>
                        </Flex>
                        <ProgressBar value={item.progress} className="mt-2" />
                    </Card>
                ))}
            </Grid>
        </div>
    );
}
