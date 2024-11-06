"use client";

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { buttonVariants } from "@/components/ui/button";

interface UserDetails {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const changeUserDetailsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitSignupHandler = async (event: FormEvent) => {
    event.preventDefault();
    const { username, password } = userDetails;

    if (username.trim().length === 0 || password.trim().length < 8) return;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      const token = await response.user.getIdToken();

      const userData = {
        name: response.user.displayName,
        email: response.user.email,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userdata", JSON.stringify(userData));
    } catch (error) {
      console.error("Error creating User: ", error);
    }
  };

  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex max-w-fit items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white px-8 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-black">
            Get Started With Weeked
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-sm h-auto overflow-hidden bg-transparent backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
            Create your new account
          </h2>
          <form onSubmit={submitSignupHandler}>
            <div className="flex flex-col relative w-full border-b-2 border-black mb-8">
              <input
                id="email"
                type="email"
                name="email"
                value={userDetails.email}
                onChange={changeUserDetailsHandler}
                className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none"
                required
              />
              <label
                htmlFor="email"
                className="absolute text-md font-medium ml-2 text-gray-700 transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
              >
                Email
              </label>
            </div>
            <div className="flex flex-col relative w-full border-b-2 border-black mb-8">
              <input
                id="username"
                type="text"
                name="username"
                value={userDetails.username}
                onChange={changeUserDetailsHandler}
                className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none"
                required
              />
              <label
                htmlFor="username"
                className="absolute text-md font-medium ml-2 text-gray-700 transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
              >
                User Name
              </label>
            </div>
            <div className="relative w-full border-b-2 border-black mb-8">
              <div className="flex flex-col">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userDetails.password}
                  onChange={changeUserDetailsHandler}
                  className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-md font-medium ml-2 text-gray-700 transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pb-1">
                {showPassword ? (
                  <FaEye
                    className="text-gray-500 cursor-pointer"
                    onClick={togglePasswordHandler}
                  />
                ) : (
                  <FaEyeSlash
                    className="text-gray-500 cursor-pointer"
                    onClick={togglePasswordHandler}
                  />
                )}
              </div>
            </div>
            <div className="flex items-start gap-1 mb-4">
              <input type="checkbox" className="mt-1" required />
              <p className="text-sm text-black">
                I Agree with{" "}
                <span className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </span>
              </p>
            </div>
            <button
              type="submit"
              className={buttonVariants({
                size: "default",
                className:
                  "w-full py-2 rounded-xl bg-[#FE8C00] hover:bg-orange-700 text-white",
              })}
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center mt-6 w-full">
            <div className="w-full h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500 mx-3 text-nowrap">
              Or sign in with
            </span>
            <div className="w-full h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center mt-4">
            <FcGoogle
              size={40}
              onClick={() => {} /* Implement Google Sign-in */}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <span className="text-sm text-gray-500">Have an account?</span>
            <Link
              href="/signIn"
              className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </>
  );
}
