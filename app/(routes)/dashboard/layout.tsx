import React from "react";
import DashboardProvider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div>
        <DashboardProvider>{children}</DashboardProvider>
      </div>
    </ClerkProvider>
  );
}

export default DashboardLayout;
