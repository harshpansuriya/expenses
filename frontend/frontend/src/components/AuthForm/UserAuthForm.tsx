"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "../Icons/Icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useState } from "react";

// Authentication
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm(
    this: any,
    { className, ...props }: UserAuthFormProps
) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // async function onSubmit(event: React.SyntheticEvent) {
    //     event.preventDefault();
    //     setIsLoading(true);

    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 3000);
    // }

    const firebaseConfig = {
        apiKey: "AIzaSyCjWm6w1dxNPFn5Mi0fHrRYy1ox70CPF2w",
        authDomain: "ex-me-414423.firebaseapp.com",
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = (event: { preventDefault: () => void }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Success. The user is created in Firebase");
            })
            .catch((error) => {
                // An error occurred. Set error message to be displayed to user
                setError(error.message);
                console.log(error.message);
            });

        event.preventDefault();
    };

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="********"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.google className="mr-2 h-4 w-4" />
                )}{" "}
                Google
            </Button>
        </div>
    );
}
