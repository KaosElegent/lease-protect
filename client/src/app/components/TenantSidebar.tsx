"use client";
import React from "react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import Link from "next/link";
import {
  House,
  CreditCard,
  Folder2Open,
  Chat,
  Gear,
  BoxArrowRight,
} from "react-bootstrap-icons";

interface Props {
  active: String;
}

const TenantSidebar = ({ active }: Props) => {
  return (
    <>
      <Sidebar>
        <Link href="/">
          <SidebarItem icon={<House size={20} />} text="Dashboard" active={active === "/"} />
        </Link>

        <Link href="/leases">
          <SidebarItem icon={<CreditCard size={20} />} text="Lease" active={active === "/leases"} />
        </Link>

        <Link href="/payrent" style={{ textDecoration: "none" }}>
          <SidebarItem
            icon={<Gear size={20} />}
            text="Pay Rent"
            active={active === "/payrent"}
          />
        </Link>

        <Link href="/settings">
          <SidebarItem icon={<Gear size={20} />} text="Settings" active={active === "/settings"} />
        </Link>

        <Link href="/logout">
          <SidebarItem icon={<BoxArrowRight size={20} />} text="Log Out" />
        </Link>
      </Sidebar>
    </>
  );
};

export default TenantSidebar;
