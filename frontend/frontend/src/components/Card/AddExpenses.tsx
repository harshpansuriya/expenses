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

export default function AddExpenses() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Add Expense</CardTitle>
                <CardDescription>
                    Enter your Expense details for analysis for yourself.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name*</Label>
                            <Input
                                id="name"
                                placeholder="Name of your Expense"
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Amount*</Label>
                            <Input
                                type="number"
                                id="amount"
                                placeholder="Amount of your Expense"
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                placeholder="If you have certain categories"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                placeholder="Would you like to add description"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    );
}
