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
        <label className={`text-sm font-semibold mb-1 ${labelClass}`}>
            Font Size
        </label>
        <input
            type="range"
            min={10}
            max={32}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
        />
        <div className="text-sm mt-1">{fontSize}px</div>
    </div>
);
