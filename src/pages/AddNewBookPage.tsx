import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

import { cardio } from "ldrs";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_BOOKS_API;

interface BookData {
  title: string;
  author: string;
  pages: number;
  image: string;
  description: string;
}

const AddNewBookPage = () => {
  cardio.register();

  const { isLoggedIn } = useAuthContext();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [pages, setPages] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleAuthor = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.target.value);
  const handlePages = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPages(Number(e.target.value));
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setImage(e.target.value);
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");
    setIsLoading(true);

    if (!token) {
      console.error("No auth token found");
      return;
    }

    const booksData: BookData = {
      title,
      author,
      pages,
      image,
      description,
    };

    try {
      await axios.post(`${API_URL}/books`, booksData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTimeout(() => {
        setIsLoading(false);
        toast.success("📚 Book successfully created.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/books");
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  if (isLoggedIn)
    return isLoading ? (
      <div className="flex justify-center my-80 ">
        <l-cardio size="250" stroke="4" speed="2" color="purple"></l-cardio>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 mt-20 max-w-4xl mx-auto">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-purple-800 sm:text-6xl w-[400x]">
              Add new book
            </h1>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex-1 min-w-[250px]">
                <label
                  htmlFor="book-title"
                  className="block text-xl font-medium leading-6 text-purple-500"
                >
                  Title
                </label>
                <div className="mt-2">
                  <Input
                    id="book-title"
                    name="book-title"
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Enter book title"
                    className="input input-bordered input-secondary w-full bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[250px]">
                <label
                  htmlFor="book-author"
                  className="block text-xl font-medium leading-6 text-purple-500"
                >
                  Author
                </label>
                <div className="mt-2">
                  <Input
                    id="book-author"
                    name="book-author"
                    type="text"
                    value={author}
                    onChange={handleAuthor}
                    placeholder="Enter full name of Author"
                    className="input input-bordered input-secondary w-full bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[250px]">
                <label
                  htmlFor="book-pages"
                  className="block text-xl font-medium leading-6 text-purple-500"
                >
                  Pages
                </label>
                <div className="mt-2">
                  <Input
                    id="book-pages"
                    name="book-pages"
                    type="number"
                    value={pages}
                    onChange={handlePages}
                    placeholder="Add number of pages"
                    className="input input-bordered input-secondary w-full bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[250px]">
                <label
                  htmlFor="book-image-url"
                  className="block text-xl font-medium leading-6 text-purple-500"
                >
                  Image URL
                </label>
                <div className="mt-2">
                  <Input
                    id="book-image-url"
                    name="book-image-url"
                    type="text"
                    value={image}
                    onChange={handleImage}
                    placeholder="Add image URL"
                    className="input input-bordered input-secondary w-full bg-white text-black"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 w-full">
              <label
                htmlFor="book-description"
                className="block text-xl font-medium leading-6 text-purple-500"
              >
                Book description
              </label>
              <div className="mt-2">
                <Textarea
                  id="book-description"
                  name="book-description"
                  rows={3}
                  value={description}
                  onChange={handleDescription}
                  placeholder="Add some details about this book? Why should we read it?"
                  className="textarea textarea-secondary w-full bg-white text-black rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button variant="ghost">
              <Link to="/books">Cancel</Link>
            </Button>
            <Button
              disabled={!title || !author || !pages || !image || !description}
              type="submit"
              className="w-[75px] rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-purple-300"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    );
};

export default AddNewBookPage;
