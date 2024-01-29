import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Calendar } from "@/components/ui/calendar";
import AddForm from "../Form/AddForm";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddExpenses() {
    return (
        <Tabs defaultValue="expense" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="expense">Expense</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>
            <TabsContent value="expense">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add Expense</CardTitle>
                        <CardDescription>
                            Enter your Expense details for analysis for
                            yourself.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddForm />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        Don't worry, This won't be shared with anyone, unless
                        you do.
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="income">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Add Income</CardTitle>
                        <CardDescription>
                            Enter your Income details for analysis for yourself.
                        </CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex justify-between">
                        Don't worry, This won't be shared with anyone, unless
                        you do.
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
