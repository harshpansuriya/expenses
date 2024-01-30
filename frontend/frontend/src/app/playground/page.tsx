import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import BasicChart from "@/components/Playground/AreaChart/Basic";
import CategoryBar from "@/components/Playground/CategoryWise/CategoryBar";
import Basic from "@/components/Playground/KPICards/Basic";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import React from "react";

function page() {
    return (
        <>
            <nav>
                <Navbar />
            </nav>

            <main className="grid grid-flow-row gap-10 mx-40 items-center my-10">
                <div className="grid grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                You're expense graphs.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Basic />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                You're expense graph.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <BasicChart />
                        </CardContent>
                    </Card>
                </div>
                <div className=" mt-10">
                    <CategoryBar />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default page;
