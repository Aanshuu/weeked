
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Main Dashboard Component
export default function DashboardPage() {
  // const [open, setOpen] = useState(false);
  const {open, setOpen} = useSidebar();
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <SidebarProvider>
      <div className="h-screen flex">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {/* <div>
            <SidebarLink
              link={{
                label: "User Profile",
                href: "#",
                icon: (
                  <Image
                    src="/avatar-placeholder.png" // Replace with your avatar image
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div> */}
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-8">
        {/* Your dashboard content here */}
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>
    </div>
    </SidebarProvider>
    
  );
}

const Logo = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-secondary">W</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-primary dark:text-secondary whitespace-pre"
      >
        Weeked.
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-secondary">W</span>
    </Link>
  );
};