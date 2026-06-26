import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { memo } from "react";

interface ArrowProps {
    onClick?: () => void;
    style?: React.CSSProperties;
}

const NextArrow = memo(function NextArrow({ onClick }: ArrowProps) {
    return (
        <div className="arrow-wrapper arrow-next" onClick={onClick}>
            <div className="arrow-btn">
                <ChevronRight size={20} />
            </div>
        </div>
    );
});

const PrevArrow = memo(function PrevArrow({ onClick }: ArrowProps) {
    return (
        <div className="arrow-wrapper arrow-prev" onClick={onClick}>
            <div className="arrow-btn">
                <ChevronLeft size={20} />
            </div>
        </div>
    );
});

export { NextArrow, PrevArrow };
