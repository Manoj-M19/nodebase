"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "./lib/auth-client";
import { useRouter } from "next/navigation";

/* ---------- TYPES ---------- */

type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type SidebarGroupType = {
  title: string;
  items: SidebarItem[];
};

/* ---------- MENU CONFIG ---------- */

const menuItems: SidebarGroupType[] = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

/* ---------- COMPONENT ---------- */

export const AppSidebar = () => {
   const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {/* -------- HEADER -------- */}
      <SidebarHeader>
        <SidebarMenuButton asChild className="gap-x-3 h-10 px-4">
          <Link href="/workflows">
            <Image
              src="/logo.svg"
              alt="Nodebase"
              width={30}
              height={30}
            />
            <span className="font-semibold text-sm">Nodebase</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* -------- CONTENT -------- */}
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* -------- FOOTER -------- */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Upgrade to Pro"
              className="gap-x-4 h-10 px-4"
            >
              <StarIcon className="h-4 w-4" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
            >
              <CreditCardIcon className="h-4 w-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="gap-x-4 h-10  px-4"
              onClick={() => authClient.signOut({
                fetchOptions:{
                  onSuccess:() => {
                    router.push("/login");
                  },
                },
              })}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
