"use client";

import AppSidebar from "@/components/ui/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthProvider } from "@/services/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center border border-gray-200 rounded-md gap-2 p-3 shadow-md">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
              </div>
            </div>
          </header>
          <div className="p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
