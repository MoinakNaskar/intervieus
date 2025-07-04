import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="app-layout">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        <div className="root-layout">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
