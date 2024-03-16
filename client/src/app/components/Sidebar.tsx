import { MoreVertical } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useContext } from "react";
import React from "react";
import iconimg from "../../../assets/images/lp-icon.png"
import { User } from "../../interfaces/userInterface";

interface Props {
  children: React.ReactNode;
  user: User;
  type: String;
}

const SidebarContext = React.createContext({ expanded: true });

const Sidebar = ({ children, user, type }: Props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen w-1/5 shadow-lg" >
      <nav className="h-full flex flex-col bg-darknavy text-white border-r shadow">
        <div className={`p-4 pb-2 flex justify-center items-center items-start`}
              style={{ maxHeight: '100px' }}>
          <img
            src={iconimg.src}
            className={`overflow-hidden transition-all w-32`}
            alt="LeaseProtect Icon"
            style={{maxWidth: '50px'}}
          />
          <div className="text-start">
            <div style={{ color: 'rgb(39, 238, 222)',  display: 'block' }}>Lease</div>
            <div style={{ color: 'rgb(250,250,250)',  display: 'block' }}>Protect</div>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 text-white">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
  <img
    src={user?.picture}
    alt="Profile"
    className="img-fluid rounded profile-picture mr-3"
    style={{ width: '40px', height: '40px' }}
  />
  <div className="text-white">
    <div>
      <div className="flex justify-between items-center">
          <div className="text-s">{user?.name}</div>
          <div className="text-xs text-gray-400">{type}</div>
      </div>
      <span className="text-xs">{user?.email}</span>
    </div>
  </div>
  <MoreVertical size={20} className="ml-auto text-white" />
</div>

      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 fg-darknavy"
            : "hover:bg-indigo-50 text-white"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default Sidebar;
