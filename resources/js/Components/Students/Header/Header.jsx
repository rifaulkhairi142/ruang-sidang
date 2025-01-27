import React from "react";
import DropdownUser from "./DropdownUser";
import { Link, router } from "@inertiajs/react";
import LogoIcon from "../../../../../public/images/logo/Lambang_UIN_Ar-Raniry.png";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-999 flex bg-white border w-full border  backdrop-blur-sm dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 ">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => router.visit("/")}
                >
                    <div className="flex w-20 h-20 items-center">
                        <img alt="UIN Ar-Raniry" src={LogoIcon}></img>
                    </div>
                </div>

                <div className="flex items-center ">
                    {/* <!-- User Area --> */}
                    <DropdownUser />
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
