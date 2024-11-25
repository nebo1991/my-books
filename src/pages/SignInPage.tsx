import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import teamPhoto from "../assets/welcome-back.png";
import validator from "validator";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BOOKS_API;

const SignInPage = () => {
  const { setIsLoggedIn, setUser, setLibraryId } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) =>
    setPassword(e.target.value);

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("All inputs are required");
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.status !== 200) {
        setErrorMessage("Something went wrong");
        return;
      }

      localStorage.setItem("authToken", response.data.authToken);

      // Set state
      setIsLoggedIn(true);
      setLibraryId(null);
      setUser(response.data.user);

      navigate("/books");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="space-y-8 mt-10 max-w-xl w-full px-4">
          <form onSubmit={handleLoginSubmit}>
            <div className="flex justify-center mb-6">
              <div>
                <img src={teamPhoto} className="w-[200px] mx-6" />
                <h1 className="font-bold tracking-tight text-purple-800 sm:text-4xl">
                  Welcome back
                </h1>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <div>
              <label className=" flex items-center gap-2 bg-purple-200 mb-4 rounded-md ">
                <Input
                  type="email"
                  className="grow p-5 rounded-md border-s-0 focus:border-purple-600 text-purple-600"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-purple-200 mb-4 text-purple-600 rounded-md ">
                <Input
                  type="password"
                  placeholder="Password"
                  className="focus:border-purple-600 grow p-5 "
                  value={password}
                  onChange={handlePassword}
                />
              </label>
              <Button
                disabled={!email || !password}
                className="btn btn-outline w-full h-12 py-3 mt-4 bg-purple-900 hover:bg-purple-900 hover:border-green-400 hover:text-green-400 text-white disabled:bg-gray-200 disabled:text-gray-300"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
