import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Basic from "@/components/Playground/KPICards/Basic";
import React from "react";

function page() {
    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <main>
                <div>
                    <h1>All Your Summary</h1>
                    <Basic />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default page;
