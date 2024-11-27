import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import teamPhoto from "../assets/welcome-back.png";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BOOKS_API;

const SignUpPage = () => {
  const [email, setEmail] = useState<string | "">("");
  const [name, setName] = useState<string | "">("");
  const [password, setPassword] = useState<string | "">("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        name,
        password,
      });

      console.log(response.data);
      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "top-center" });
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="space-y-8 mt-10 max-w-xl w-full px-4">
          {success ? (
            <div className="text-center">
              <div className="flex justify-center items-center ">
                <h1 className="font-bold tracking-tight text-green-500 sm:text-6xl w-full text-center">
                  Sign up successful 🚀
                </h1>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                You can now log in to your account.
              </p>
              <div className="flex justify-center mt-6">
                <Link to="/sign-in">
                  <p className="text-lg font-semibold leading-6 text-gray-900 my-3 hover:text-purple-400">
                    Go to Login <span aria-hidden="true">&rarr;</span>
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-6">
                <div>
                  <img src={teamPhoto} className="w-[200px] mx-6" />
                  <h1 className="font-bold tracking-tight text-purple-800 sm:text-4xl">
                    Join our book community
                  </h1>
                </div>
              </div>

              <div>
                <label className=" flex items-center gap-2 bg-purple-200 mb-4 rounded-md ">
                  <Input
                    type="text"
                    className="grow p-5 rounded-md border-s-0 focus:border-purple-600 text-purple-600"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                  />
                </label>

                <label className=" flex items-center gap-2 bg-purple-200 mb-4 rounded-md ">
                  <Input
                    type="name"
                    className="grow p-5 rounded-md border-s-0 focus:border-purple-600 text-purple-600"
                    placeholder="Username"
                    value={name}
                    onChange={handleName}
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
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
