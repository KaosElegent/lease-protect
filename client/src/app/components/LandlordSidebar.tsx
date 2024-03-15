"use client";
import React from "react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import Link from "next/link";
import {
  House,
  Buildings,
  People,
  Chat,
  Gear,
  BoxArrowRight,
} from "react-bootstrap-icons";

const LandlordSidebar = () => {
  return (
    <>
      <Sidebar>
        <Link href="/" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<House size={20} />} text="Dashboard" active />
        </Link>

        <Link href="/properties" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<Buildings size={20} />} text="Properties" />
        </Link>

        <Link href="/tenants" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<People size={20} />} text="Tenants" />
        </Link>

        <Link href="/messages" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<Chat size={20} />} text="Messages" alert />
        </Link>

        <Link href="/settings" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<Gear size={20} />} text="Settings" />
        </Link>

        <Link href="/api/auth/logout" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<BoxArrowRight size={20} />} text="Log Out" />
        </Link>

        <Link href="/create-lease" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<BoxArrowRight size={20} />} text="create lease" />
        </Link>
      </Sidebar>
    </>
  );
};

export default LandlordSidebar;
