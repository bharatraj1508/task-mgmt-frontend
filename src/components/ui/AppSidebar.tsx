"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/services/AuthContext";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <Home />,
        label: "Home",
        href: "/home",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  // {
  //   title: "OTHER",
  //   items: [
  //     {
  //       icon: <LogOut />,
  //       label: "Logout",
  //       href: "/logout",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //   ],
  // },
];

export default function AppSidebar() {
  const { logout } = useAuth();

  const paths = usePathname();
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {menuItems.map((group) => (
            <div key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="ml-2">
                  {group.items.map((item) => {
                    return (
                      <SidebarMenuItem className="my-1.5" key={item.label}>
                        <SidebarMenuButton
                          asChild
                          isActive={paths === item.href}
                          className="hover:bg-red-100 transition-all duration-300"
                        >
                          <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>OTHER</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="ml-2">
              <SidebarMenuItem className="my-1.5">
                <SidebarMenuButton
                  asChild
                  className="hover:bg-red-100 transition-all duration-300"
                >
                  <div className="cursor-pointer" onClick={() => logout()}>
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
