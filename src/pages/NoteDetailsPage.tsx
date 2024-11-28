import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cardio } from "ldrs";
import { useAuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_BOOKS_API;

interface Note {
  id?: number;
  title?: string;
  description?: string;
  createdById?: number;
}

cardio.register();

const NoteDetailsPage = () => {
  const { isLoggedIn, user } = useAuthContext();

  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<Note>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // We can also avoid Pronmise<void> and TS will know thats Promise void.
  const fetchSingleNote = async (idNote: string): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/notes/${idNote}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response: ", response.data);

      setNote(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (idNote: string): Promise<void> => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/notes/${idNote}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/notes");
      }, 2000);
    } catch (error) {
      console.error("There was an error deleting the note:", error);
    }
  };

  useEffect(() => {
    if (noteId) {
      fetchSingleNote(noteId);
    }
  }, [noteId]);

  if (!isLoggedIn) return null;

  return isLoading ? (
    <div className="flex justify-center my-80">
      <div className="flex flex-col gap-12">
        <l-cardio size="250" stroke="4" speed="2" color="purple"></l-cardio>
        <p className="ml-16 text-purple-800">Deleting the note....</p>
      </div>
    </div>
  ) : (
    <div className="flex py-40 gap-16">
      <div className="flex flex-col items-center mx-auto">
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-black sm:text-7xl text-center">
          {note.title}
        </h1>
        <p className="mt-4 text-pretty text-xl font-medium text-gray-500 sm:text-xl/8 text-center">
          {note.description}
        </p>
        <div className="my-80">
          <dialog id="my_modal_3" className="modal bg-transparent">
            <div className="modal-box bg-red-300 shadow-xl rounded-lg p-6">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:text-gray-300 transition-transform transform hover:scale-110"
                  aria-label="Close"
                >
                  ✕
                </button>
              </form>

              <h3 className="font-bold text-lg text-white text-center mb-4">
                Are you sure you want to delete this note?
              </h3>
              <p className="py-4 text-white text-center">
                Press <strong>`Delete`</strong> to confirm.
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  className="btn bg-white text-red-600 border border-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                  onClick={() => {
                    if (noteId) {
                      deleteNote(noteId);
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
        {note?.createdById === user?.id && (
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

export default NoteDetailsPage;
