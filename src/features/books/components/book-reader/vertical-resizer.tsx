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

    // Background colors depending on theme and state
    const bgIdle = isDark ? "bg-gray-700" : "bg-gray-300";
    const bgHover = isDark ? "hover:bg-gray-600" : "hover:bg-gray-400";
    const bgActive = isDark ? "bg-gray-600" : "bg-gray-600";

    // Line colors inside the resizer dots
    const lineIdle = isDark ? "bg-gray-400" : "bg-gray-500";
    const lineActive = "bg-white";

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const containerWidth = containerRect.width;

        const min = 200;
        const max = containerWidth;

        // Buffer width (left empty space): 8px (w-2)
        // Resizer width (w-3): 12px
        // Center of resizer relative to container left edge:
        const centerShift = 8 + 12 / 2; // 8 + 6 = 14

        // Calculate new width, adjusted to cursor being in center of resizer
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
        // Flex container to put buffer and resizer side by side
        <div className="flex shrink-0" style={{ zIndex: 10 }}>
            {/* Buffer between lift and resizer */}
            <div className="w-2" />
            {/* Resizer itself with rounded corners */}
            <div
                onMouseDown={startDragging}
                className={`
                    cursor-col-resize
                    w-3
                    relative
                    rounded-lg
                    ${dragActive ? bgActive : `${bgIdle} ${bgHover}`}
                    ${className}
                `}
                style={{ height: "100%" }}
            >
                {/* Three vertical dots inside resizer */}
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
