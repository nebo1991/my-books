import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_BOOKS_API;

const CreateNewLibraryPage = () => {
  const { isLoggedIn } = useAuthContext();
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem("authToken");
    event.preventDefault();
    setIsLoading(true);

    try {
      // Send the POST request to create the library
      const response = await axios.post(
        `${API_URL}/libraries`,
        {
          name, // Library name from the form input
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the auth token to the request header
          },
        }
      );

      const libraryId = response.data.id; // Adjusted to match the response format

      // Navigate to the newly created library's page
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/my-library/${libraryId}`);
      }, 3000); // Optional delay, can be adjusted or removed if not needed
    } catch (error) {
      setIsLoading(false);
      console.log(error); // Log any error that occurs during the request
    }
  };

  if (isLoggedIn)
    return isLoading ? (
      <>
        <div className="flex flex-col space-y-3 justify-center items-center">
          <Skeleton className="h-[100px] w-[60%] rounded-xl" />
          <Skeleton className="h-[100px] w-[60%] rounded-xl" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </>
    ) : (
      <>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12 mt-20 max-w-4xl mx-auto">
            <div className="border-b border-gray-900/10 pb-12">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-purple-800 sm:text-7xl text-center">
                Library
              </h1>

              <div className="mt-10 flex flex-wrap gap-6">
                <div className="flex-1 min-w-[250px]">
                  <label
                    htmlFor="library-title"
                    className="block text-xl font-medium leading-6 text-purple-500"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <Input
                      id="library-title"
                      name="library-title"
                      type="text"
                      value={name}
                      onChange={handleName}
                      placeholder="Enter library title"
                      className="input input-bordered input-secondary w-full bg-white text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to="/my-library">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </p>
              </Link>
              <Button
                type="submit"
                disabled={!name}
                className="w-[75px] rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-purple-300 hover:bg-purple-700"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </>
    );
};

export default CreateNewLibraryPage;
