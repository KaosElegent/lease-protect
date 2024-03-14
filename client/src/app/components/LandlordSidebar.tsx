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
        <Link href="/">
          <SidebarItem icon={<House size={20} />} text="Dashboard" active />
        </Link>

        <Link href="/properties">
          <SidebarItem icon={<Buildings size={20} />} text="Properties" />
        </Link>

        <Link href="/tenants">
          <SidebarItem icon={<People size={20} />} text="Tenants" />
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

export default LandlordSidebar;
