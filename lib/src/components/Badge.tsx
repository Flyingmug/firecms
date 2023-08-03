import React from "react";

export type BadgeColor = "primary" | "secondary" | "error";

interface BadgeProps {
    color?: BadgeColor;
    children: React.ReactNode;
    invisible?: boolean;
}

const getColor = (color: BadgeColor) => {
    switch (color) {
        case "primary":
            return "bg-primary";
        case "secondary":
            return "bg-secondary";
        case "error":
            return "bg-red-500";
        default:
            return "bg-gray-300 dark:bg-gray-700";
    }
}

export const Badge: React.FC<BadgeProps> = ({
                                                color = "primary",
                                                invisible = false,
                                                children
                                            }) => {
    return (
        <div className="relative inline-block">
            {children}
            <span
                className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full
        ${getColor(color)}
        transition-all duration-200 ease-out
        ${invisible ? "w-0 h-0" : "w-2 h-2"}`}
            />
        </div>
    );
}