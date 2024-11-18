// "use client";

// import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
// import Link from "next/link";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import { buttonVariants } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   UserCredential,
// } from "firebase/auth";
// import { auth } from "@/lib/firebase/config";
// import { FcGoogle } from "react-icons/fc";

// interface LoginDetails {
//   email: string;
//   password: string;
// }

// interface UserData {
//   email?: string;
//   name?: string;
//   profilePic?: string;
// }

// export default function SignIn() {
//   const [loginDetails, setLoginDetails] = useState<LoginDetails>({
//     email: "",
//     password: "",
//   });
//   const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
//   const [userData, setUserData] = useState<UserData>({});
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUserData = JSON.parse(
//         localStorage.getItem("userdata") || "{}"
//       ) as UserData;
//       setUserData(storedUserData);

//       if (storedUserData?.email) {
//         setLoginSuccess(true);
//       }
//     }
//   }, []);

//   const togglePasswordHandler = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const changeLoginDetailsHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     setLoginDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const loginSubmitHandler = async (event: FormEvent) => {
//     event.preventDefault();

//     if (
//       loginDetails.email.trim().length === 0 ||
//       loginDetails.password.trim().length < 8
//     )
//       return;

//     try {
//       const response: UserCredential = await signInWithEmailAndPassword(
//         auth,
//         loginDetails.email,
//         loginDetails.password
//       );
//       const token = await response.user.getIdToken();

//       const userData = {
//         email: response.user.email,
//       };

//       if (typeof window !== "undefined") {
//         localStorage.setItem("token", token);
//         localStorage.setItem("userdata", JSON.stringify(userData));
//       }
//       setLoginSuccess(true);
//       console.log("Login Success");
//       router.push("/dashboard");
//     } catch (error) {
//       console.log("Error Signing In: ", error);
//     }
//   };

//   const signinWithGoogleHandler = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then(async (result) => {
//         const { displayName, email, photoURL } = result.user;
//         const token = await result.user.getIdToken();

//         if (typeof window !== "undefined") {
//           localStorage.setItem("token", token);
//           localStorage.setItem(
//             "userdata",
//             JSON.stringify({ name: displayName, email, profilePic: photoURL })
//           );
//         }
//         setLoginSuccess(true);
//         router.push("/dashboard");
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <>
//       <MaxWidthWrapper className="mb-12 mt-10 flex flex-col items-center justify-center text-center">
//         <div className="mb-4 flex max-w-fit items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white px-8 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
//           <p className="text-sm font-semibold text-black">Welcome to Weeked</p>
//         </div>
//         <div className="flex flex-col items-center justify-center w-full max-w-sm h-auto overflow-hidden bg-transparent backdrop-blur-md p-8 rounded-lg shadow-lg">
//           <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
//             Login
//           </h2>
//           <form onSubmit={loginSubmitHandler} className="">
//             <div
//               className="flex flex-col relative w-full border-b-2 border-black mb-8"
//               style={{ borderBottom: "2px solid black" }}
//             >
//               <input
//                 id="email"
//                 type="text"
//                 name="email"
//                 // style={{
//                 //   border: "none",
//                 //   outline: "none",
//                 //   boxShadow: "none",
//                 //   background: "transparent",
//                 // }}
//                 value={loginDetails.email}
//                 onChange={changeLoginDetailsHandler}
//                 className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none"
//                 required
//               />
//               <label
//                 htmlFor="email"
//                 className="absolute text-md font-medium ml-2 text-gray-700 transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
//               >
//                 Email
//               </label>
//             </div>
//             <div
//               className="relative w-full border-b-2 border-black mb-8"
//               style={{ borderBottom: "2px solid black" }}
//             >
//               <div className="flex flex-col">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   // style={{
//                   //   border: "none",
//                   //   outline: "none",
//                   //   boxShadow: "none",
//                   //   background: "transparent",
//                   // }}
//                   value={loginDetails.password}
//                   onChange={changeLoginDetailsHandler}
//                   className="peer w-full px-3 py-2 mt-1 sm:text-sm focus:ring-0 bg-transparent border-none outline-none box-shadow-none"
//                   required
//                 />
//                 <label
//                   htmlFor="password"
//                   className="absolute text-md font-medium ml-2 text-gray-700 transition-all transform -translate-y-1/2 top-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:text-sm peer-valid:top-0 peer-valid:-translate-y-5 peer-valid:text-sm"
//                 >
//                   Password
//                 </label>
//               </div>

//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pb-1">
//                 {showPassword ? (
//                   <FaEye
//                     className="text-gray-500 cursor-pointer"
//                     onClick={togglePasswordHandler}
//                   />
//                 ) : (
//                   <FaEyeSlash
//                     className="text-gray-500 cursor-pointer"
//                     onClick={togglePasswordHandler}
//                   />
//                 )}
//               </div>
//             </div>
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center mr-4">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <Link
//                   href="#"
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className={buttonVariants({
//                 size: "default",
//                 className: "w-full py-2 rounded-xl",
//               })}
//             >
//               Login
//             </button>
//           </form>
//           <div className="flex items-center justify-center mt-6 w-full">
//             <div className="w-full h-px bg-gray-300"></div>
//             <span className="text-sm text-gray-500 mx-3 text-nowrap">
//               Or sign in with
//             </span>
//             <div className="w-full h-px bg-gray-300"></div>
//           </div>
//           <div className="flex justify-center mt-4">
//             <FcGoogle
//               size={40}
//               onClick={signinWithGoogleHandler}
//               className="cursor-pointer"
//             />
//           </div>
//           <div className="flex items-center justify-center mt-6">
//             <span className="text-sm text-gray-500">
//               Don&apos;t have an account?
//             </span>
//             <Link
//               href="/auth/signUp"
//               className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-500"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </MaxWidthWrapper>

//       <div>
//         <div>
//           <div className="relative isolate">
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//             >
//               <div
//                 style={{
//                   clipPath:
//                     "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
//                 }}
//                 className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { signIn } from "next-auth/react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
// import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-10 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex max-w-fit items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white px-8 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-black">Welcome to Weeked</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-sm h-auto overflow-hidden bg-transparent backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">
            Login
          </h2>
          <button
            onClick={handleSignIn}
            className="w-full py-2 rounded-xl bg-primary hover:bg-primary/80 text-white"
          >
            Sign in with Google
          </button>
          <div className="flex items-center justify-center mt-6">
            <span className="text-sm text-gray-500">
              Don&apos;t have an account?
            </span>
            <Link
              href="/auth/signUp"
              className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <div>
        <div>
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
        </div>
      </div>
    </>
  );
}
