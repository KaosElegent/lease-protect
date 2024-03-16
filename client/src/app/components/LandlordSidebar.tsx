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
  userType: String;
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

        {/* remove later */}
        <Link href="/create-lease" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<BoxArrowRight size={20} />}
            text="create lease"
            active={active === "/create-lease"}
          />
        </Link>

        <Link href="/confirmrent" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<BoxArrowRight size={20} />}
            text="confirm rent"
            active={active === "/confirmrent"}
          />
        </Link>

        <Link href="/payrent" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<BoxArrowRight size={20} />}
            text="pay rent"
            active={active === "/payrent"}
            
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

      </Sidebar>
    </>
  );
};

export default LandlordSidebar;
