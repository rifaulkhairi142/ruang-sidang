import Header from "@/Components/Students/Header/Header";
import Navigation from "@/Components/Students/Navigation/Navigation";
import React, { useState } from "react";

const StudentLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        // <div className="dark:bg-boxdark-2 bg-white/70 dark:text-bodydark">
        <div className="dark:bg-boxdark-2 font-satoshi bg-white/80 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex flex-col relative h-screen overflow-hidden">
                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto z-0 max-w-screen-lg p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                        <div className="h-48"></div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>

                {/* <!-- ===== Content Area End ===== --> */}
            </div>

            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
};

export default StudentLayout;
