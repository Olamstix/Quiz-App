"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode; // ✅ Make `children` optional
}

export function Button({ children = "", ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="px-4 py-2 mt-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            {children}
        </button>
    );
}
