import { FC, useEffect, useState, Fragment } from "react";
import { AccessToken } from "@travel-tailor/types";
import { jwtDecode } from "@travel-tailor/functions";
import { ROLES, ROUTES } from "@travel-tailor/constants";
import { TokenService } from "@travel-tailor/services";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const advertiserNavigation = [
  { name: "Dashboard", href: ROUTES.ADVERTISER.DASHBOARD, current: true },
  { name: "Invoices", href: ROUTES.ADVERTISER.INVOICE.INDEX, current: false },
];

const adminNavigation = [
  { name: "Dashboard", href: ROUTES.ADMIN.DASHBOARD, current: true },
  { name: "Advertisers", href: ROUTES.ADMIN.ADVERTISER, current: false },
  { name: "Travelers", href: ROUTES.ADMIN.TRAVELER, current: false },
  { name: "Activities", href: ROUTES.ADMIN.ACTIVITIES, current: false },
  { name: "Comments", href: ROUTES.ADMIN.COMMENTS.INDEX, current: false },
  { name: "Tags", href: ROUTES.ADMIN.TAGS, current: false },
  { name: "Travels", href: ROUTES.ADMIN.TRAVEL, current: false },
];

const travelerNavigation = [
  { name: "Dashboard", href: ROUTES.TRAVELER.DASHBOARD, current: true },
  { name: "Tastes", href: ROUTES.TRAVELER.TASTE.INDEX, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState<string>("");

  const handleFetch = async () => {
    const token = TokenService.getAccessToken();
    if (token) {
      setAccessToken(token);
      const decodedToken = jwtDecode(token) as AccessToken;
      switch (decodedToken.roles) {
        case ROLES.ADVERTISER:
          setRole(ROLES.ADVERTISER);
          break;
        case ROLES.TRAVELER:
          setRole(ROLES.TRAVELER);
          break;
        case ROLES.ADMIN:
          setRole(ROLES.ADMIN);
          break;
      }
    }
  };

  const params = usePathname();

  useEffect(() => {
    switch (params) {
      case ROUTES.ADVERTISER.DASHBOARD:
        advertiserNavigation[0].current = true;
        advertiserNavigation[1].current = false;
        break;
      case ROUTES.ADVERTISER.INVOICE.INDEX:
        advertiserNavigation[0].current = false;
        advertiserNavigation[1].current = true;
        break;
      case ROUTES.TRAVELER.DASHBOARD:
        travelerNavigation[0].current = true;
        travelerNavigation[1].current = false;
        break;
      case ROUTES.TRAVELER.TASTE.INDEX:
        travelerNavigation[0].current = false;
        travelerNavigation[1].current = true;
        break;
      case ROUTES.ADMIN.DASHBOARD:
        adminNavigation[0].current = true;
        adminNavigation[1].current = false;
        adminNavigation[2].current = false;
        adminNavigation[3].current = false;
        adminNavigation[4].current = false;
        adminNavigation[5].current = false;
        adminNavigation[6].current = false;
        break;
      case ROUTES.ADMIN.ADVERTISER:
        adminNavigation[0].current = false;
        adminNavigation[1].current = true;
        adminNavigation[2].current = false;
        adminNavigation[3].current = false;
        adminNavigation[4].current = false;
        adminNavigation[5].current = false;
        adminNavigation[6].current = false;
        break;
      case ROUTES.ADMIN.TRAVELER:
        adminNavigation[0].current = false;
        adminNavigation[1].current = false;
        adminNavigation[2].current = true;
        adminNavigation[3].current = false;
        adminNavigation[4].current = false;
        adminNavigation[5].current = false;
        adminNavigation[6].current = false;
        break;
      case ROUTES.ADMIN.ACTIVITIES:
        adminNavigation[0].current = false;
        adminNavigation[1].current = false;
        adminNavigation[2].current = false;
        adminNavigation[3].current = true;
        adminNavigation[4].current = false;
        adminNavigation[5].current = false;
        adminNavigation[6].current = false;
        break;
      case ROUTES.ADMIN.COMMENTS.INDEX:
        adminNavigation[0].current = false;
        adminNavigation[1].current = false;
        adminNavigation[2].current = false;
        adminNavigation[3].current = false;
        adminNavigation[4].current = true;
        adminNavigation[5].current = false;
        adminNavigation[6].current = false;
        break;
      case ROUTES.ADMIN.TAGS:
        adminNavigation[0].current = false;
        adminNavigation[1].current = false;
        adminNavigation[2].current = false;
        adminNavigation[3].current = false;
        adminNavigation[4].current = false;
        adminNavigation[5].current = true;
        adminNavigation[6].current = false;
        break;
      case ROUTES.ADMIN.TRAVEL:
        adminNavigation[0].current = false;
        adminNavigation[1].current = false;
        adminNavigation[2].current = false;
        adminNavigation[3].current = false;
        adminNavigation[4].current = false;
        adminNavigation[5].current = false;
        adminNavigation[6].current = true;
        break;

      default:
        advertiserNavigation[0].current = false;
        advertiserNavigation[1].current = false;
        travelerNavigation[0].current = false;
        travelerNavigation[1].current = false;
        adminNavigation[0].current = false;
        adminNavigation[1].current = false;
        adminNavigation[2].current = false;
        adminNavigation[3].current = false;
        adminNavigation[4].current = false;
        adminNavigation[5].current = false;
        adminNavigation[6].current = false;
        break;
    }
  }, [params]);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed z-10 w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={ROUTES.ROOT}>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {accessToken && role === ROLES.ADVERTISER
                      ? advertiserNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))
                      : accessToken && role === ROLES.TRAVELER
                      ? travelerNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))
                      : accessToken && role === ROLES.ADMIN
                      ? adminNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              {accessToken ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100 hover:text-cyan-500" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100 hover:text-cyan-500" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={ROUTES.AUTH.SIGNIN}
                              onClick={() => TokenService.removeAccessToken()}
                              className={classNames(
                                active ? "bg-gray-100 hover:text-cyan-500" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <Link href={ROUTES.AUTH.SIGNIN} className="text-white hover:text-cyan-500">
                  Sign in
                </Link>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {accessToken && role === ROLES.ADVERTISER
                ? advertiserNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))
                : accessToken && role === ROLES.TRAVELER
                ? travelerNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))
                : accessToken && role === ROLES.ADMIN
                ? adminNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))
                : null}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
