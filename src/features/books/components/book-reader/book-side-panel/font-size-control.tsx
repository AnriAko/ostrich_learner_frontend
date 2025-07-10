import React from "react";

interface FontSizeControlProps {
    fontSize: number;
    setFontSize: (size: number) => void;
    labelClass: string;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({
    fontSize,
    setFontSize,
    labelClass,
}) => (
    <div>
        <label className={`text-xs font-semibold ${labelClass}`}>
            Font Size
        </label>
        <input
            type="range"
            min={10}
            max={32}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-1.5"
        />

        <div className="text-xs">{fontSize}px</div>
    </div>
);
