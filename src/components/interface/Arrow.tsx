import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { memo } from "react";

interface ArrowProps {
    onClick?: () => void;
    style?: React.CSSProperties;
}

const NextArrow = memo(function NextArrow({ onClick }: ArrowProps) {
    return (
        <button type="button" aria-label="Next project" className="arrow-wrapper arrow-next bg-transparent border-0 p-0" onClick={onClick}>
            <span className="arrow-btn">
                <ChevronRight size={20} aria-hidden="true" />
            </span>
        </button>
    );
});

const PrevArrow = memo(function PrevArrow({ onClick }: ArrowProps) {
    return (
        <button type="button" aria-label="Previous project" className="arrow-wrapper arrow-prev bg-transparent border-0 p-0" onClick={onClick}>
            <span className="arrow-btn">
                <ChevronLeft size={20} aria-hidden="true" />
            </span>
        </button>
    );
});

export { NextArrow, PrevArrow };
