import { useUser } from "../../../shared/context/user-context/use-user";
import { useGetBooksByUser } from "../hooks/use-book";
import { useState } from "react";

export const BookPanel = () => {
    const { user } = useUser();
    const { data: books, isLoading } = useGetBooksByUser(user?.userId || "");
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    if (isLoading) return <p>Loading books...</p>;
    if (!books?.length) return <p>No books found.</p>;

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Your Books</h2>
            <ul className="space-y-1">
                {books.map((book) => (
                    <li key={book._id}>
                        <button
                            className={`w-full text-left p-2 rounded ${
                                selectedBookId === book._id
                                    ? "bg-blue-100"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                                setSelectedBookId(book._id);
                            }}
                        >
                            {book.b}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
