"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentData() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState<any>(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>All Expenses</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    {data.map((data: any, id: any) => (
                        <div key={id}>
                            <h1>{data.name}</h1>
                            <h1>{data.price}</h1>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

//     return (
//
//     );
// }
