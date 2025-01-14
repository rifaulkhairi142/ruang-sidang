import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

const ListProdi = ({ base_url, message, props }) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [dataRuang, setDataRuang] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [visiblePages, setVisiblePages] = useState([]);
    const [prevPage, setPrevPage] = useState(null);

    const getVisiblePages = (page, dataRuang) => {
        let totalPages = Math.ceil(dataRuang.total / dataRuang?.data?.length);

        const vvisiblePages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                vvisiblePages.push(i);
            }
        } else {
            vvisiblePages.push(1);

            if (page > 4) vvisiblePages.push("...");

            for (
                let i = Math.max(2, page - 1);
                i <= Math.min(totalPages - 1, page + 1);
                i++
            ) {
                vvisiblePages.push(i);
            }

            if (page < totalPages - 3) vvisiblePages.push("...");

            vvisiblePages.push(totalPages);
        }
        setVisiblePages(vvisiblePages);
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${base_url}/api/admin/data/prodi?page=${currentPage}&search_key=${searchKey}`
            );
            setDataRuang(response.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            getVisiblePages(response.data.current_page, response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const deleteRecords = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${base_url}/api/admin/data/prodi/delete/${id}`
            );
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentPage !== prevPage || message !== null) {
            fetchData(); // Only fetch if currentPage is different from prevPage
            setPrevPage(currentPage); // Update prevPage
        }
    }, [currentPage, prevPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const toggleDropdown = (id) => {
        setDropdownOpen((prevOpen) => (prevOpen === id ? null : id));
    };

    // Handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <AdminLayout>
            <Head title="List Prodi" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <section className="dark:bg-gray-900 sm:p-5">
                    <div className="mx-auto ">
                        <div className="flex justify-between items-center py-3">
                            <h2 className="text-2xl font-semibold">Prodi</h2>
                            <ul className="flex gap-x-3">
                                <li className="cursor-pointer">Dashboard</li>
                                <li>{">"}</li>
                                <li className="text-primary2-600">Prodi</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center text-white bg-primary2-700 hover:bg-primary2-800 focus:ring-4 focus:ring-primary2-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary2-600 dark:hover:bg-primary2-700 focus:outline-none dark:focus:ring-primary2-800"
                                        onClick={(e) =>
                                            router.visit(
                                                "/admin/data/prodi/add"
                                            )
                                        }
                                    >
                                        <svg
                                            className="h-3.5 w-3.5 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                            />
                                        </svg>
                                        Add Prodi
                                    </button>
                                </div>

                                <div className="flex items-center w-full">
                                    <label
                                        for="simple-search"
                                        className="sr-only"
                                    >
                                        Search
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                setSearchKey(e.target.value);
                                            }}
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search nama prodi..."
                                            required
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCurrentPage(1);
                                            fetchData();
                                        }}
                                        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative overflow-x-auto min-h-50">
                                {loading && (
                                    <div className="absolute z-10 w-full h-full flex items-center justify-center bg-white/70">
                                        <ThreeDot
                                            color="#4F61E3"
                                            size="medium"
                                        />
                                    </div>
                                )}

                                <table className="w-full relative text-sm text-left text-gray-500 dark:text-gray-400 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Code
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRuang?.data?.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b dark:border-gray-700"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {item.row_index}
                                                </th>
                                                <td className="px-4 py-3">
                                                    {item?.name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {item?.kode}
                                                </td>

                                                <td className="px-4 py-3 flex items-center justify-end">
                                                    <button
                                                        onClick={() =>
                                                            toggleDropdown(
                                                                index
                                                            )
                                                        }
                                                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                        type="button"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 rotate-90"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </button>
                                                    {dropdownOpen === index && (
                                                        <div
                                                            ref={dropdownRef}
                                                            className="z-999999 w-44 bg-white rounded divide-y divide-gray-100 shadow-4 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2"
                                                        >
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                                                <li>
                                                                    <a
                                                                        onClick={() => {
                                                                            router.get(
                                                                                `/admin/data/prodi/edit/${item.id}`
                                                                            );
                                                                            setDropdownOpen(
                                                                                null
                                                                            );
                                                                        }}
                                                                        className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    >
                                                                        Show
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        onClick={() => {
                                                                            router.get(
                                                                                `/admin/data/prodi/edit/${item.id}`
                                                                            );
                                                                            setDropdownOpen(
                                                                                null
                                                                            );
                                                                        }}
                                                                        className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                            <div className="py-1">
                                                                <a
                                                                    onClick={() => {
                                                                        deleteRecords(
                                                                            item.id
                                                                        );

                                                                        setDropdownOpen(
                                                                            null
                                                                        );
                                                                    }}
                                                                    className="cursor-pointer block py-2 px-4 text-sm text-red-600 bg-red-400/10 hover:bg-red-500/20 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                >
                                                                    Delete
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <div className="h-16"></div>
                                </table>
                            </div>
                            <nav
                                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                                aria-label="Table navigation"
                            >
                                <span className="flex gap-x-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Showing
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {`${
                                            dataRuang.to -
                                            dataRuang?.data?.length +
                                            1
                                        }-${dataRuang.to}`}
                                    </span>
                                    of
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {dataRuang.total}
                                    </span>
                                </span>

                                <ul className="inline-flex items-stretch -space-x-px">
                                    <li>
                                        <a
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage - 1
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <span className="sr-only">
                                                Previous
                                            </span>
                                            <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    {visiblePages.map((item, index) =>
                                        item === "..." ? (
                                            <li key={index + 1}>
                                                <button
                                                    className={`flex items-center justify-center py-2 px-3 border leading-tight text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                                                >
                                                    {item}
                                                </button>
                                            </li>
                                        ) : (
                                            <li key={index + 1}>
                                                <button
                                                    className={`flex items-center justify-center py-2 px-3 border leading-tight ${
                                                        currentPage === item
                                                            ? "text-blue-600 bg-blue-50 border-blue-300"
                                                            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                                                    }`}
                                                    onClick={() =>
                                                        handlePageChange(item)
                                                    }
                                                >
                                                    {item}
                                                </button>
                                            </li>
                                        )
                                    )}

                                    <li>
                                        <a
                                            onClick={() =>
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                            disabled={currentPage === lastPage}
                                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <span className="sr-only">
                                                Next
                                            </span>
                                            <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </LocalizationProvider>
        </AdminLayout>
    );
};

export default ListProdi;
