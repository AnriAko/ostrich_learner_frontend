import { useUser } from "../../../shared/context/user-context/use-user";
import { useGetBooksByUser } from "../hooks/use-book";
import { useState } from "react";
import { BookOverviewDto } from "../dto/book-overview.dto";
import { BookOverviewItem } from "./book-overview-item";

export const BookPanel = () => {
    const { user } = useUser();
    const { data: bookOverviews, isLoading } = useGetBooksByUser(
        user?.userId || ""
    );
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    if (isLoading) return <p>Loading books...</p>;
    if (!bookOverviews?.length) return <p>No books found.</p>;

    const sortedBooks = [...bookOverviews].sort((a, b) => {
        const aTime = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
        const bTime = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
        return bTime - aTime;
    });

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Your Books</h2>
            <ul className="space-y-1">
                {sortedBooks.map((book: BookOverviewDto) => (
                    <li key={book._id}>
                        <BookOverviewItem
                            book={book}
                            isSelected={selectedBookId === book._id}
                            onSelect={setSelectedBookId}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
