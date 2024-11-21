import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import teamPhoto from "../assets/welcome-back.png";

const SignInPage = () => {
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="space-y-8 mt-10 max-w-xl w-full px-4">
          <div className="flex justify-center mb-6">
            <div>
              <img src={teamPhoto} className="w-[200px] mx-6" />
              <h1 className="font-bold tracking-tight text-purple-800 sm:text-4xl">
                Welcome back
              </h1>
            </div>
          </div>
          <div>
            <label className=" flex items-center gap-2 bg-purple-200 mb-4 rounded-md ">
              <Input
                type="email"
                className="grow p-5 rounded-md border-s-0 focus:border-purple-600 text-purple-600"
                placeholder="Email"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-purple-200 mb-4 text-purple-600 rounded-md ">
              <Input
                type="password"
                placeholder="Password"
                className="focus:border-purple-600 grow p-5 "
              />
            </label>
            <Button className="btn btn-outline w-full h-12 py-3 mt-4 bg-purple-900 hover:bg-purple-900 hover:border-green-400 hover:text-green-400 text-white disabled:bg-gray-200 disabled:text-gray-300">
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
