"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Book = {
  id: string;
  book: string;
  author?: string;
  status?: "not started" | "reading" | "completed" | string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBooks = async () => {
      if (!session?.user || !("id" in session.user)) return;

      // session.user.id might be typed as unknown by next-auth types, cast if needed
      const userId = (session.user as any).id;
      const res = await fetch(`/api/books?userId=${userId}`);
      const data = await res.json();
      setBooks((data?.books ?? []) as Book[]);
      setLoading(false);
    };

    fetchBooks();
  }, [status, session]);

  // DELETE BOOK
  const deleteBook = async (bookId: string) => {
    await fetch(`/api/books?id=${bookId}`, {
      method: "DELETE",
    });

    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{book.book}</h2>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  book.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : book.status === "reading"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {book.status || "not started"}
              </span>
            </div>
            <p className="text-gray-600">by {book.author}</p>


            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteBook(book.id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
