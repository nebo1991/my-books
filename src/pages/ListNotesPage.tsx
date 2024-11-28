import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_BOOKS_API;

interface Note {
  id: number;
  title: string;
  description: string;
  createdById: number;
}

const ListNotesPage = () => {
  const { isLoggedIn } = useAuthContext();
  const [notes, setNote] = useState<Note[]>([]);
  const token = localStorage.getItem("authToken");

  const fetchBooks = async () => {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNote(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoggedIn)
    return (
      <>
        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex justify-end">
              <Link to="/notes/add-new">
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
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {notes.map((note) => {
                return (
                  <Link key={note.id} to={`/notes/${note.id}`}>
                    <div className="group relative">
                      <div className="flex items-center justify-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-purple-200 text-purple-700 text-lg font-semibold text-center px-4 py-2 lg:aspect-none lg:h-40">
                        {note.title.length > 50
                          ? `${note.title.substring(0, 50)}...`
                          : note.title}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {note.title.length > 80
                                ? `${note.description.substring(0, 80)}...`
                                : note.description}
                            </a>
                          </h3>
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

export default ListNotesPage;
