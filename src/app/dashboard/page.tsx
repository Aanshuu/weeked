// "use client";
// import React, { useState } from "react";
// import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
// import DateOfBirthModal from "@/components/modals/DateOfBirthModal";
// import ProtectedRoute from "@/components/common/ProtectedRoute";
// import { signOut } from "firebase/auth";
// import { auth } from "../../lib/firebase/config";
// import { useRouter } from "next/navigation";
// // import { generateSlug } from "@/lib/utils";

// const weeksInYear = 52;

// const Dashboard: React.FC = () => {
//   const [dob, setDob] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(!dob);
//   const [number, setNumber] = useState<number>(0);
//   const router = useRouter();

//   const handleDateOfBirthSubmit = (dateOfBirth: Date) => {
//     setDob(dateOfBirth.toISOString().split("T")[0]); // Store the date in YYYY-MM-DD format
//     setShowModal(false);
//   };

//   const calculateFilledBlocks = (dob: string | null): number => {
//     if (!dob) return 0;

//     const today = new Date();
//     const dobDate = new Date(dob);
//     const dobWeek = Math.floor(
//       (today.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
//     );
//     return dobWeek;
//   };

//   const filledBlocks = calculateFilledBlocks(dob);

//   const renderBlocks = () => {
//     const weeksInLife = 60 * weeksInYear; // Total number of weeks in a 60-year lifespan

//     return Array.from({ length: weeksInLife }, (_, index) => {
//       // Calculate the week number within the year (1 to 52)
//       const weekNumber = (index % weeksInYear) + 1;
//       // const slug = generateSlug(index);

//       return (
//         <div
//           key={index}
//           className={`w-4 h-4 border border-gray-300 transition-transform duration-100 ease-in-out flex items-center justify-center ${
//             index < filledBlocks ? "bg-black" : "bg-white"
//           } custom-hover-scale relative`}
//           // onClick={() => router.push(`/notes/${slug}`)}
//         >
//           <span className="week-number opacity-0 transition-opacity duration-200 ease-in-out">
//             {weekNumber}
//           </span>
//         </div>
//       );
//     });
//   };

//   const logoutHandler = async () => {
//     await signOut(auth);
//     if (typeof window !== "undefined") {
//       localStorage.clear();
//     }
//     router.push("/");
//   };

//   return (
//     <ProtectedRoute>
//       <>
//         {showModal && (
//           <DateOfBirthModal
//             toggleModal={() => setShowModal(false)}
//             onSubmit={handleDateOfBirthSubmit}
//           />
//         )}
//         <div className="relative">
//           <div className="absolute top-0 left-0 p-2">
//             <button onClick={logoutHandler}>Log Out</button>
//           </div>
//         </div>
//         <MaxWidthWrapper className="py-8">
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(52, minmax(0, 1fr))",
//               gap: "0.5rem",
//             }}
//           >
//             {renderBlocks()}
//           </div>
//         </MaxWidthWrapper>
//       </>
//     </ProtectedRoute>
//   );
// };

// export default Dashboard;

// src/app/dashboard/page.tsx
"use client"

import MaxWidthWrapper from "@/components/common/MaxWidthWrapper"
import DateOfBirthModal from "@/components/modals/DateOfBirthModal"
import ProtectedRoute from "@/components/common/ProtectedRoute"
import { useSession } from "next-auth/react"
import { useState } from "react"

const weeksInYear = 52

export default function Dashboard() {
  const { data: session } = useSession()
  const [dob, setDob] = useState<string | null>(null)
  const [showModal, setShowModal] = useState<boolean>(!dob)

  const handleDateOfBirthSubmit = (dateOfBirth: Date) => {
    setDob(dateOfBirth.toISOString().split("T")[0]); // Store the date in YYYY-MM-DD format
    setShowModal(false);
  };

  const calculateFilledBlocks = (dob: string | null): number => {
    if (!dob) return 0;

    const today = new Date();
    const dobDate = new Date(dob);
    const dobWeek = Math.floor(
      (today.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    return dobWeek;
  };

  const filledBlocks = calculateFilledBlocks(dob);
  
  const renderBlocks = () => {
    const weeksInLife = 60 * weeksInYear; // Total number of weeks in a 60-year lifespan

    return Array.from({ length: weeksInLife }, (_, index) => {
      // Calculate the week number within the year (1 to 52)
      const weekNumber = (index % weeksInYear) + 1;
      // const slug = generateSlug(index);

      return (
        <div
          key={index}
          className={`w-4 h-4 border border-gray-300 transition-transform duration-100 ease-in-out flex items-center justify-center ${
            index < filledBlocks ? "bg-black" : "bg-white"
          } custom-hover-scale relative`}
          // onClick={() => router.push(`/notes/${slug}`)}
        >
          <span className="week-number opacity-0 transition-opacity duration-200 ease-in-out">
            {weekNumber}
          </span>
        </div>
      );
    });
  };

  return (
    <ProtectedRoute>
      <>
        {showModal && (
          <DateOfBirthModal
            toggleModal={() => setShowModal(false)}
            onSubmit={handleDateOfBirthSubmit}
          />
        )}
        <MaxWidthWrapper className="py-8">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(52, minmax(0, 1fr))",
              gap: "0.5rem",
            }}
          >
            {renderBlocks()}
          </div>
        </MaxWidthWrapper>
      </>
    </ProtectedRoute>
  );
};