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

const TenantSidebar = () => {
  return (
    <>
      <Sidebar>
        <Link href="/">
          <SidebarItem icon={<House size={20} />} text="Dashboard" active />
        </Link>

        <Link href="/properties">
          <SidebarItem icon={<CreditCard size={20} />} text="Payments" />
        </Link>

        <Link href="/tenants">
          <SidebarItem icon={<Folder2Open size={20} />} text="Documents" />
        </Link>

        <Link href="/messages">
          <SidebarItem icon={<Chat size={20} />} text="Messages" alert />
        </Link>

        <Link href="/settings">
          <SidebarItem icon={<Gear size={20} />} text="Settings" />
        </Link>

        <Link href="/logout">
          <SidebarItem icon={<BoxArrowRight size={20} />} text="Log Out" />
        </Link>
      </Sidebar>
    </>
  );
};

export default TenantSidebar;
