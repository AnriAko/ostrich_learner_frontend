import { BookOverviewDto } from "../dto/book-overview.dto";

interface BookOverviewItemProps {
    book: BookOverviewDto;
    isSelected: boolean;
    onSelect: (bookId: string) => void;
}

export const BookOverviewItem = ({
    book,
    isSelected,
    onSelect,
}: BookOverviewItemProps) => {
    const getProgressPercent = () => {
        const { lastViewedPage, lastViewedPageSize, p_count } = book;
        if (
            typeof lastViewedPage === "number" &&
            typeof lastViewedPageSize === "number" &&
            typeof p_count === "number" &&
            p_count > 0 &&
            lastViewedPage > 0
        ) {
            const completed = (lastViewedPage - 1) * lastViewedPageSize;
            const percent = (completed / p_count) * 100;
            return Math.min(percent, 100).toFixed(0);
        }
        return null;
    };

    const progress = getProgressPercent();

    return (
        <button
            className={`w-full text-left p-2 rounded transition ${
                isSelected ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(book._id)}
        >
            <div className="font-medium">{book.b}</div>
            {progress !== null && (
                <div className="text-sm text-gray-600">
                    Progress: {progress}%
                </div>
            )}
        </button>
    );
};
