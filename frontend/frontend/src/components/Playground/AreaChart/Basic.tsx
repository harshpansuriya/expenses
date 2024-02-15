"use client";

import { InformationCircleIcon } from "@heroicons/react/solid";
import {
    AreaChart,
    Color,
    Flex,
    Icon,
    Tab,
    TabGroup,
    TabList,
    Text,
    Title,
} from "@tremor/react";
import { useState } from "react";

const usNumberformatter = (number: number, decimals = 0) =>
    Intl.NumberFormat("us", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
        .format(Number(number))
        .toString();

const formatters: { [key: string]: any } = {
    Expense: (number: number) => `$ ${usNumberformatter(number)}`,
    Income: (number: number) => `$ ${usNumberformatter(number)}`,
    Average: (number: number) => `${usNumberformatter(number)}`,
    Delta: (number: number) => `${usNumberformatter(number, 2)}%`,
};

const Kpis = {
    Expense: "Expense",
    Income: "Income",
    Average: "Average",
};

const kpiList = [Kpis.Expense, Kpis.Income, Kpis.Average];

export type DailyPerformance = {
    date: string;
    Expense: number;
    Income: number;
    Average: number;
};

export const performance: DailyPerformance[] = [
    {
        date: "2023-05-01",
        Expense: 900.73,
        Income: 173,
        Average: 73,
    },
    {
        date: "2023-05-02",
        Expense: 1000.74,
        Income: 174.6,
        Average: 74,
    },
    {
        date: "2023-05-03",
        Expense: 1100.93,
        Income: 593.1,
        Average: 293,
    },
    {
        date: "2023-05-04",
        Expense: 1200.9,
        Income: 290.2,
        Average: 29,
    },
];

export default function BasicChart() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedKpi = kpiList[selectedIndex];

    const areaChartArgs = {
        className: "mt-5 h-72",
        data: performance,
        index: "date",
        categories: [selectedKpi],
        colors: ["blue"] as Color[],
        showLegend: false,
        valueFormatter: formatters[selectedKpi],
        yAxisWidth: 60,
    };

    return (
        <>
            <div className="md:flex justify-between">
                <div>
                    <Flex
                        className="space-x-0.5"
                        justifyContent="start"
                        alignItems="center"
                    >
                        <Title> Performance History </Title>
                        <Icon
                            icon={InformationCircleIcon}
                            variant="simple"
                            tooltip="Shows daily increase or decrease of particular domain"
                        />
                    </Flex>
                    <Text> Daily change per domain </Text>
                </div>
                <div>
                    <TabGroup
                        index={selectedIndex}
                        onIndexChange={setSelectedIndex}
                    >
                        <TabList color="gray" variant="solid">
                            <Tab>Expense</Tab>
                            <Tab>Income</Tab>
                            <Tab>Average</Tab>
                        </TabList>
                    </TabGroup>
                </div>
            </div>
            {/* web */}
            <div className="mt-8 hidden sm:block">
                <AreaChart {...areaChartArgs} />
            </div>
            {/* mobile */}
            <div className="mt-8 sm:hidden">
                <AreaChart
                    {...areaChartArgs}
                    startEndOnly={true}
                    showGradient={false}
                    showYAxis={false}
                />
            </div>
        </>
    );
}
