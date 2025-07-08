import React, { useRef, useState } from "react";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";

interface VerticalResizerProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    onResizeTo: (newX: number) => void;
    className?: string;
}

export const VerticalResizer: React.FC<VerticalResizerProps> = ({
    containerRef,
    onResizeTo,
    className = "",
}) => {
    const isDragging = useRef(false);
    const [dragActive, setDragActive] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bgIdle = isDark ? "bg-gray-700" : "bg-gray-300";
    const bgHover = isDark ? "hover:bg-gray-600" : "hover:bg-gray-400";
    const bgActive = isDark ? "bg-gray-600" : "bg-gray-600";

    const lineIdle = isDark ? "bg-gray-400" : "bg-gray-500";
    const lineActive = "bg-white";

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const containerWidth = containerRect.width;

        const min = 200;
        const max = containerWidth;

        // ml-5 = 20px, w-3 = 12px → centerShift = 20 + 6 = 26
        const marginLeft = 20;
        const resizerWidth = 12;
        const centerShift = marginLeft + resizerWidth / 2;

        let newLeftWidth = e.clientX - containerLeft - centerShift;
        newLeftWidth = Math.min(Math.max(newLeftWidth, min), max);

        onResizeTo(newLeftWidth);
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        setDragActive(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
    };

    const startDragging = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
        setDragActive(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "none";
    };

    return (
        <div className="flex shrink-0" style={{ zIndex: 10 }}>
            {/* Buffer between lift and resizer */}
            <div className="w-2" />
            <div
                onMouseDown={startDragging}
                className={`
                    cursor-col-resize
                    w-3
                    ml-5
                    relative
                    rounded-lg
                    ${dragActive ? bgActive : `${bgIdle} ${bgHover}`}
                    ${className}
                `}
                style={{ height: "100%" }}
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1"
                    style={{ height: 24 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-0.5 h-4 rounded-full ${
                                dragActive ? lineActive : lineIdle
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
