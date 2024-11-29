import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cardio } from "ldrs";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_BOOKS_API;

interface Book {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  pages?: number;
  image?: string;
  createdById?: number;
}

cardio.register();

const BookDetailsPage = () => {
  const { isLoggedIn, libraryId, user } = useAuthContext();

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
      toast.success(" ❤️ Successfully added to library!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "top-center" });
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
        <img
          src={book.image}
          className="w-[800px] min-w-80 ml-10"
          alt={book.title}
        />
      </div>
      <div>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-purple-800 sm:text-7xl text-left">
          {book.title}
        </h1>
        <p className="mt-4 text-pretty text-2xl text-gray-600 text-left">
          {book.author}
        </p>
        <p className="mt-4 text-pretty text-2xl text-gray-600 text-left">
          Pages: {book.pages}
        </p>
        <p className="mt-6 text-pretty text-xl font-medium text-gray-900 sm:text-xl/8 text-left">
          {book.description}
        </p>
        <div className="my-80">
          <dialog id="my_modal_3" className="modal bg-transparent">
            <div className="modal-box bg-red-400 shadow-xl rounded-lg p-6">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                  aria-label="Close"
                >
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg text-white text-center mb-4">
                Are you sure you want to delete this book?
              </h3>
              <p className="py-4 text-white text-center">
                Press <strong>`Delete`</strong> to confirm.
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  className="btn bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
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
      <div className="flex flex-col items-center">
        <button
          className="btn btn-sm btn-circle btn-ghost my-2"
          onClick={() => {
            if (bookId) {
              addBookToLibrary(bookId);
            }
          }}
        >
          ❤️
        </button>
        {book?.createdById === user?.id && (
          <button
            className="btn btn-outline border-transparent  my-4 text-black"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_3"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            <Trash2 size={30} color="#c828c3" strokeWidth={1} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;
