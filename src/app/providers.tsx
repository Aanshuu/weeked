// src/app/providers.tsx
// "use client";

// import { SessionProvider } from "next-auth/react";
// import { ReactNode } from "react";

// interface ProvidersProps {
//   children: ReactNode;
// }

// const Providers = ({ children }: ProvidersProps) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// export default Providers;

// src/app/providers.tsx
"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}