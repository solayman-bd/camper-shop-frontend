import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FC } from "react";
type NavItem = {
  id: number;
  name: string;
  url: string;
  active: boolean;
};

const Navbar: FC = () => {
  const navItemData: NavItem[] = [
    { id: 1, name: "Home", url: "/", active: true },
    { id: 2, name: "Products", url: "/products", active: false },
    { id: 3, name: "Contact Us", url: "/contact-us", active: false },
  ];

  const [navItems, setNavItems] = useState<NavItem[]>(navItemData);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (id: number) => {
    setNavItems(
      navItems.map((item) => ({
        ...item,
        active: item.id === id,
      }))
    );
  };

  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between min-w-full p-4">
        <a
          href="/"
          className="flex items-center space-x-0 sm:space-x-3 rtl:space-x-reverse"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#504dea"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-10 w-10 sm:h-14 sm:w-14"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 21l16 -4" />
            <path d="M20 21l-16 -4" />
            <path d="M12 15a4 4 0 0 0 4 -4c0 -3 -2 -3 -2 -8c-4 2 -6 5 -6 8a4 4 0 0 0 4 4z" />
          </svg>
          <span className="self-center text-2xl md:text-3xl font-semibold md:font-bold whitespace-nowrap dark:text-white">
            Camping Shop
          </span>
        </a>
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.url}
                  className={`block py-2 px-3 ${
                    item.active ? "bg-blue-700 text-white" : "bg-transparent"
                  } rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white my-1 md:my-0 md:dark:text-blue-500 text-xl md:text-2xl hover:animate-pulse`}
                  aria-current={item.active ? "page" : undefined}
                  onClick={() => handleNavItemClick(item.id)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
