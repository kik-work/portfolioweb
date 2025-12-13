import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface ArrowProps {
    onClick?: () => void;
    style?: React.CSSProperties;
}

const NextArrow = ({ onClick, style }: ArrowProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: hovered
                    ? "var(--primary)"
                    : "var(--background)",
                color: hovered ? "var(--background)" : "var(--primary)",
                borderRadius: "9999px",
                width: 40,
                height: 40,
                zIndex: 50,
                cursor: "pointer",
                transition: "all 0.3s",
                position: "absolute",
                top: "50%",
                right: -20,
                transform: "translateY(-50%)",
            }}
        >
            <ChevronRight size={20} />
        </div>
    );
};

const PrevArrow = ({ onClick, style }: ArrowProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: hovered
                    ? "var(--primary)"
                    : "var(--background)",
                color: hovered ? "var(--background)" : "var(--primary)",
                borderRadius: "9999px",
                width: 40,
                height: 40,
                zIndex: 50,
                cursor: "pointer",
                transition: "all 0.3s",
                position: "absolute",
                top: "50%",
                left: -20,
                transform: "translateY(-50%)",
            }}
        >
            <ChevronLeft size={20} />
        </div>
    );
};

export { NextArrow, PrevArrow };
