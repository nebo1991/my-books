import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cardio } from "ldrs";
import { useAuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_BOOKS_API;

interface Book {
  _id?: string;
  title?: string;
  author?: string;
  description?: string;
  pages?: number;
  image?: string;
  createdBy?: string;
}

cardio.register();

const BookDetailsPage = () => {
  const { isLoggedIn, libraryId } = useAuthContext();

  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // We can also avoid Pronmise<void> and TS will know thats Promise void.
  const fetchSingleBook = async (idBook: string): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/books/${idBook}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response: ", response.data);

      setBook(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (idBook: string): Promise<void> => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/books/${idBook}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/books");
      }, 2000);
    } catch (error) {
      console.error("There was an error deleting the book:", error);
    }
  };

  const addBookToLibrary = async (idBook: string): Promise<void> => {
    try {
      await axios.put(
        `${API_URL}/libraries/${libraryId}`,
        { bookId: idBook },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchSingleBook(bookId);
    }
  }, [bookId]);

  if (!isLoggedIn) return null;

  return isLoading ? (
    <div className="flex justify-center my-80 ">
      <div className="flex flex-col gap-12">
        <l-cardio size="250" stroke="4" speed="2" color="purple"></l-cardio>
        <p className="ml-16 text-purple-800">Deleting the book....</p>
      </div>
    </div>
  ) : (
    <div className="flex py-40 gap-16">
      <div className="ml-12">
        <img src={book.image} className="w-[800px] ml-10" alt={book.title} />
      </div>
      <div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-black sm:text-7xl">
          {book.title}
        </h1>
        <p className="mt-2 text-pretty text-2xl text-gray-600">{book.author}</p>
        <p className="mt-4 text-pretty text-xl font-medium text-gray-500 sm:text-xl/8">
          {book.description}
        </p>
        <div className="my-80">
          <button
            className="btn btn-outline border-transparent hover:bg-red-400 my-4 text-black"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_3"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            Remove book
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box bg-red-400">
              <form method="dialog">
                <div>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
                    ✕
                  </button>
                </div>
              </form>

              <h3 className="font-bold text-lg text-white">
                Are you sure you want to delete this book
              </h3>
              <div className="flex gap-48 mt-8">
                <p className="py-4 text-white">Press `Delete` to confirm</p>
                <button
                  className="text-white btn bg-transparent border-solid border-red-600 hover:bg-red-500 hover:border-red-600"
                  onClick={() => {
                    if (bookId) {
                      deleteBook(bookId);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <button
        className="btn btn-sm btn-circle btn-ghost my-6"
        onClick={() => {
          if (bookId) {
            addBookToLibrary(bookId);
          }
        }}
      >
        ❤️
      </button>
    </div>
  );
};

export default BookDetailsPage;
