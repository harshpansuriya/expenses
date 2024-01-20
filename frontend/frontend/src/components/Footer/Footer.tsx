import React from "react";

import { Separator } from "../ui/separator";

function Footer() {
    return (
        <div className="w-full ">
            <Separator className="my-4" />
            <h1 className="text-center ">
                &copy; 2024, All rights reserved |{" "}
                <span className="font-bold">Ex Me</span>
            </h1>
        </div>
    );
}

export default Footer;
