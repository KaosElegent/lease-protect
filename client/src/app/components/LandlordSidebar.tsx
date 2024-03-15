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

interface Props {
  active: String;
}

const LandlordSidebar = ({ active }: Props) => {
  return (
    <>
      <Sidebar>
        <Link href="/" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<House size={20} />}
            text="Dashboard"
            active={active === "/"}
          />
        </Link>

        <Link href="/leases" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<Buildings size={20} />}
            text="Properties"
            active={active === "/leases"}
          />
        </Link>

        <Link href="/tenants" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<People size={20} />}
            text="Tenants"
            active={active === "/tenants"}
          />
        </Link>

        <Link href="/messages" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<Chat size={20} />}
            text="Messages"
            alert
            active={active === "/messages"}
          />
        </Link>

        <Link href="/settings" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<Gear size={20} />}
            text="Settings"
            active={active === "/settings"}
          />
        </Link>

        <Link href="/api/auth/logout" style={{ textDecoration: "none" }}>
          <SidebarItem icon={<BoxArrowRight size={20} />} text="Log Out" />
        </Link>

        {/* remove later */}
        <Link href="/create-lease" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<BoxArrowRight size={20} />}
            text="create lease"
            active={active === "/create-lease"}
          />
        </Link>

        <Link href="/create-contract" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<BoxArrowRight size={20} />}
            text="create contract"
            active={active === "/create-contract"}
          />
        </Link>
      </Sidebar>
    </>
  );
};

export default LandlordSidebar;
