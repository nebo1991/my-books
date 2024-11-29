import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_BOOKS_API;

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  pages: number;
  image: string;
  createdById: number;
}

const ListBooksPage = () => {
  const { isLoggedIn } = useAuthContext();
  const [books, setBook] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const response = await axios.get(`${API_URL}/books`);
    setBook(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoggedIn)
    return (
      <>
        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* <div className="flex justify-end">
              <Link to="/books/add-new">
                <button className="btn btn-circle btn-outline border-solid border-transparent hover:bg-purple-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#7c12e5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </Link>
            </div> */}

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {books.map((book) => {
                return (
                  <Link key={book.id} to={`/books/${book.id}`}>
                    <div className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img
                          alt="book-cover"
                          src={book.image}
                          className="h-full w-full lg:h-full lg:w-full object-fill"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-700 text-left">
                          <a>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {book.title}
                          </a>
                        </h3>
                        <div className="flex justify-between items-baseline">
                          <p className="text-sm text-gray-500">{book.author}</p>
                          <p className="text-sm text-gray-500">
                            {book.pages} pages
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
};

export default ListBooksPage;
