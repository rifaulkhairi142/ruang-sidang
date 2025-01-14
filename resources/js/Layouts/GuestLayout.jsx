import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import bg from "../../../public/images/logo/landmark-uinar-scaled.jpg";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center  pt-6 sm:justify-center sm:pt-0">
            <div>
                <div>
                    <Link href="/" className="flex w-fit h-fit">
                        <img
                            className="w-28 cursor-pointer "
                            src="https://upload.wikimedia.org/wikipedia/commons/a/af/Lambang_UIN_Ar-Raniry.png"
                        />
                    </Link>
                </div>

                <div className="mt-6 w-fit bg-white px-6 py-4 shadow-md max-w-96  sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
