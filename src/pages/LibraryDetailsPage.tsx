import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_BOOKS_API;

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  pages: number;
  image: string;
  createdById: number;
  __v: number;
}

interface Library {
  id: number;
  name: string;
  books: Book[];
  createdById: number;
  __v: number;
}

const LibraryDetailsPage = () => {
  const { idLibrary } = useParams<{ idLibrary: string }>();
  const { isLoggedIn } = useAuthContext();
  const [library, setLibrary] = useState<Library | null>(null);
  const token = localStorage.getItem("authToken");

  console.log("Auth token:", token);

  // Fetch library details
  const fetchLibrary = async (idLibrary: string) => {
    try {
      const response = await axios.get(`${API_URL}/libraries/${idLibrary}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched library:", response.data); // Debugging log
      setLibrary(response.data);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/libraries/${idLibrary}/remove-book`,
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(" 💔 Successfully removed a book from the library.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLibrary(response.data);
    } catch (error) {
      console.error("Error removing book from library:", error);
    }
  };

  useEffect(() => {
    if (idLibrary) {
      console.log("Fetching library with ID:", idLibrary); // Debugging log
      fetchLibrary(idLibrary);
    }
  }, [idLibrary]);

  if (!isLoggedIn) {
    return <p>You need to log in to view this page.</p>;
  }

  if (!library) {
    return (
      <>
        <div className="flex items-center justify-center my-4">
          <Skeleton className="h-[50px] w-[600px] rounded-xl" />
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
            <Skeleton className="h-[300px] w-[225px] rounded-xl" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-purple-800 sm:text-6xl w-[400x]">
          {library.name}
        </h1>
      </div>
      <div className="flex justify-end">
        <Link to="/notes">
          <button className="btn btn-circle btn-outline border-solid border-transparent hover:bg-purple-300">
            Notes and Quotes
          </button>
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {library.books.map((book: Book) => (
          <div key={book.id} className="group relative">
            <Link to={`/books/${book.id}`}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt="book-cover"
                  src={book.image}
                  className="h-full w-full object-fill lg:h-full lg:w-full"
                />
              </div>
            </Link>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">{book.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{book.author}</p>
              </div>
              <button
                onClick={() => handleRemoveBook(`${book.id}`)}
                className="text-red-500 hover:text-red-700"
                title="Remove Book"
              >
                💔
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryDetailsPage;
