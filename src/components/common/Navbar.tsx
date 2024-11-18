// "use client";

// import Link from "next/link";
// import MaxWidthWrapper from "./MaxWidthWrapper";
// import { buttonVariants } from "../ui/button";
// import { ArrowRight } from "lucide-react";
// import { TransitionLink } from "@/lib/TransitionLink";

// const Navbar = () => {
//   return (
//     <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
//       <MaxWidthWrapper>
//         <div className="flex h-14 items-center justify-between border-b border-zinc-200">
//           <TransitionLink href="/" className="flex z-40 font-semibold">
//             <span>Weeked.</span>
//           </TransitionLink>

//           {/* Mobile Navbar */}

//           <div className="hidden items-center space-x-4 sm:flex">
//             <>
//               <TransitionLink
//                 href="/study"
//                 className={buttonVariants({
//                   variant: "ghost",
//                   size: "sm",
//                 })}
//               >
//                 Pricing
//               </TransitionLink>
//               <TransitionLink
//                 href="/auth/signIn"
//                 className={buttonVariants({
//                   variant: "ghost",
//                   size: "sm",
//                 })}
//               >
//                 Sign In
//               </TransitionLink>
//               <TransitionLink
//                 href="/auth/signUp"
//                 className={buttonVariants({
//                   size: "sm",
//                 })}
//               >
//                 Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
//               </TransitionLink>
//             </>
//           </div>
//         </div>
//       </MaxWidthWrapper>
//     </nav>
//   );
// };
// export default Navbar;


// src/components/common/Navbar.tsx
"use client"

// import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { TransitionLink } from "@/lib/TransitionLink"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <TransitionLink href="/" className="flex z-40 font-semibold">
            <span>Weeked.</span>
          </TransitionLink>

          <div className="hidden items-center space-x-4 sm:flex">
            {session ? (
              <>
                <TransitionLink
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </TransitionLink>
                <button
                  onClick={() => signOut()}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <TransitionLink
                  href="/auth/signIn"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign In
                </TransitionLink>
                <TransitionLink
                  href="/auth/signUp"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
                </TransitionLink>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
