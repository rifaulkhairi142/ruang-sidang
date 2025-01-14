import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

const AddWaktu = () => {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        start: null,
        end: null,
    });
    return (
        <AdminLayout>
            <Head title="Add Waktu" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                    <div className="flex justify-between py-3">
                        <h2 className="text-2xl font-semibold">Add</h2>
                        <ul className="flex gap-x-3">
                            <li
                                className="cursor-pointer"
                                onClick={() => router.visit("/admin/dashboard")}
                            >
                                Dashboard
                            </li>
                            <li>{">"}</li>
                            <li
                                className="cursor-pointer"
                                onClick={() =>
                                    router.visit("/admin/rooms/waktu")
                                }
                            >
                                Waktu
                            </li>
                            <li>{">"}</li>
                            <li className="text-primary2-600">Add</li>
                        </ul>
                    </div>
                    <section>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row gap-x-3">
                                <TimePicker
                                    label="Start"
                                    onChange={(newValue) =>
                                        setData("start", newValue)
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root.Mui-focused":
                                            {
                                                outline: "none",
                                                boxShadow: "none",
                                            },
                                        "& .MuiInputBase-input:focus": {
                                            outline: "none",
                                            boxShadow: "none",
                                        },
                                    }}
                                />
                                <TimePicker
                                    label="End"
                                    onChange={(newValue) =>
                                        setData("end", newValue)
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root.Mui-focused":
                                            {
                                                outline: "none",
                                                boxShadow: "none",
                                            },
                                        "& .MuiInputBase-input:focus": {
                                            outline: "none",
                                            boxShadow: "none",
                                        },
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    class="flex items-center justify-center text-white bg-primary2-700 hover:bg-primary2-800 focus:ring-4 focus:ring-primary2-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary2-600 dark:hover:bg-primary2-700 focus:outline-none dark:focus:ring-primary2-800"
                                    onClick={(e) =>
                                        post("/admin/rooms/waktu/save")
                                    }
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </section>
                </section>
            </LocalizationProvider>
        </AdminLayout>
    );
};

export default AddWaktu;
