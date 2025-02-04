"use client";
import React from "react";

interface CardProps {
    children?: React.ReactNode; // ✅ Make `children` optional
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`border rounded-lg shadow p-4 bg-white ${className}`}>
            {children || <p></p>}
        </div>
    );
}

interface CardContentProps {
    children?: React.ReactNode; // ✅ Make `children` optional
    className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
    return <div className={`mt-2 ${className}`}>{children || "Empty"}</div>;
}
