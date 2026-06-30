"use client";

// import SigninGoogle from '@/components/SigninGoogle';
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from 'react-toastify';

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: `/`,
    });


    if (data) {
      toast.success("Login successfully..");
      // toast.success("Signin Sussessfully..");
    }
    if (error) {
      // toast.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="hero">
        <div className="card bg-base-100 sm:shadow-2xl">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <h1 className="text-4xl font-bold text-center mb-5 text-red-500">
                Login
              </h1>
              <div className="w-full">
                {/* <SigninGoogle></SigninGoogle> */}
              </div>
              <fieldset className="fieldset w-87.5">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input py-7 sm:py-3 w-full"
                  placeholder="Enter your email"
                />
                <div>
                  <label className="label mb-2">Password</label>
                  <div className="relative w-full max-w-sm">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input w-full py-7 sm:py-3"
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-lg top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <Button
                  className="btn  mt-4 w-full bg-red-500 text-lg font-semibold py-7 sm:py-3"
                  type="submit"
                >
                  Login
                </Button>
                <p>
                  {" "}
                  Don’t have an account?{" "}
                  <Link
                    className=" font-bold underline text-red-500"
                    href={"/register"}
                  >
                    Register
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
