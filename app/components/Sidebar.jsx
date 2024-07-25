import { Icon } from "@iconify/react";
import LinkSidebar from "./LinkSidebar";

const Sidebar = () => {
  let links = [
    { icon: "uil:home", link: "/", label: "Inicio" },
    { icon: "uil:user", link: "/clients", label: "Clientes" },
    { icon: "uil:credit-card", link: "/loans", label: "Prestamos" },
  ];

  return (
    <div className="flex flex-row sm:gap-10 min-h-screen  col-span-2 ">
      <div className="w-full">
        <input
          type="checkbox"
          id="sidebar-mobile-fixed"
          className="sidebar-state"
        />
        <label
          htmlFor="sidebar-mobile-fixed"
          className="sidebar-overlay"
        ></label>
        <aside className="sidebar sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full">
          <div className="sidebar-title items-center p-4">
            <svg
              fill="none"
              height="42"
              viewBox="0 0 32 32"
              width="42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="100%" rx="16" width="100%"></rect>
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <div className="flex flex-col">
              <span>Acme</span>
              <span className="text-xs font-normal text-content2">
                Team Plan
              </span>
            </div>
          </div>
          <div className="sidebar-content">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <span className="menu-title">Main menu</span>
                <ul className="menu-items">
                  {links.map(({ icon, link, label }) => {
                    return (
                      <li key={link}>
                        <LinkSidebar href={link}>
                          <Icon icon={icon} className="h-5 w-5 opacity-75" />
                          <span>{label}</span>
                        </LinkSidebar>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </nav>
          </div>
          <div className="sidebar-footer justify-end bg-gray-2 pt-2">
            <div className="divider my-0"></div>
            <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
              <label
                className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4"
                tabIndex="0"
              >
                <div className="flex flex-row gap-4 p-4">
                  <div className="avatar-square avatar avatar-md">
                    <img src="https://i.pravatar.cc/150?img=30" alt="avatar" />
                  </div>

                  <div className="flex flex-col">
                    <span>Sandra Marx</span>
                  </div>
                </div>
              </label>
              <div className="dropdown-menu-right-top dropdown-menu ml-2">
                <a className="dropdown-item text-sm">Profile</a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Account settings
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Change email
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Subscriptions
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Change password
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Refer a friend
                </a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Settings
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
