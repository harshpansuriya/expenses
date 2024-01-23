"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { HardDriveDownload, Loader } from "lucide-react";

function DowloadButton() {
    const [submit, setSubmit] = useState(false);

    return (
        <>
            {submit ? (
                <Button disabled>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Download
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        setSubmit(true);
                    }}
                >
                    <HardDriveDownload className="mr-2 h-4 w-4" /> Download
                </Button>
            )}
        </>
    );
}

export default DowloadButton;
