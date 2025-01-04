import React from "react";
import { TbHomeSearch } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { usePage } from "@inertiajs/react";
import SidebarLinkGroup from "../SidebarLinkGroup";
import NavLink from "../NavLink";
import { RiFolderChartLine } from "react-icons/ri";

const Navigation = () => {
    const { url } = usePage();
    const { pathname } = new URL(url, window.location.origin);

    return (
        <footer className=" bottom-0   absolute z-999 flex w-full dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-center px-4 py-2  ">
                <div className=""></div>

                <div className="flex border border-primary/30 items-center justify-center bg-white rounded-full">
                    <ul className="flex py-2 px-5 gap-x-4">
                        <SidebarLinkGroup activeCondition={pathname === "/"}>
                            <React.Fragment>
                                <NavLink
                                    href="/"
                                    className={`group relative flex flex-col items-center   font-medium text-bodydark1  px-4 rounded-full py-1 duration-300 ease-in-out hover:text-primary dark:hover:bg-meta-4 ${
                                        pathname === "/" &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <TbHomeSearch className="text-2xl" />
                                    <p className="text-xs font-semibold">
                                        Cek Jadwal
                                    </p>
                                </NavLink>
                            </React.Fragment>
                        </SidebarLinkGroup>
                        <SidebarLinkGroup
                            activeCondition={pathname === "/booking"}
                        >
                            <React.Fragment>
                                <NavLink
                                    href="/booking"
                                    className={`group relative flex items-center flex-col font-medium text-bodydark1  px-4 rounded-full py-1 duration-300 ease-in-out hover:text-primary dark:hover:bg-meta-4 ${
                                        (pathname === "/booking" ||
                                            pathname.includes("booking")) &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <MdOutlineMeetingRoom className="text-2xl" />
                                    <p className="text-xs font-semibold">
                                        Booking
                                    </p>
                                </NavLink>
                            </React.Fragment>
                        </SidebarLinkGroup>
                        <SidebarLinkGroup
                            activeCondition={pathname === "/history"}
                        >
                            <React.Fragment>
                                <NavLink
                                    href="/history"
                                    className={`group relative flex items-center  flex-col font-medium text-bodydark1  px-4 rounded-full py-1 duration-300 ease-in-out hover:text-primary dark:hover:bg-meta-4 ${
                                        (pathname === "/history" ||
                                            pathname.includes("history")) &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <RiFolderChartLine className="text-2xl" />
                                    <p className="text-xs font-semibold">
                                        History
                                    </p>
                                </NavLink>
                            </React.Fragment>
                        </SidebarLinkGroup>
                        <SidebarLinkGroup
                            activeCondition={pathname === "/profile"}
                        >
                            <React.Fragment>
                                <NavLink
                                    href="/profile"
                                    className={`group relative flex items-center  flex-col  font-medium text-bodydark1  px-4 rounded-full py-1 duration-300 ease-in-out hover:text-primary dark:hover:bg-meta-4 ${
                                        (pathname === "/profile" ||
                                            pathname.includes("profile")) &&
                                        "bg-graydark dark:bg-meta-4"
                                    }`}
                                >
                                    <FaRegUser className="text-[23px]" />
                                    <p className="text-xs font-semibold">
                                        Profil
                                    </p>
                                </NavLink>
                            </React.Fragment>
                        </SidebarLinkGroup>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Navigation;
