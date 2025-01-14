import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useState } from "react";

// Enable custom parse format plugin
dayjs.extend(customParseFormat);

const EditWaktu = ({ data_waktu }) => {
    const [start, setStart] = useState(
        data_waktu?.start ? dayjs(data_waktu.start, "HH:mm:ss") : null
    );
    const [end, setEnd] = useState(
        data_waktu?.end ? dayjs(data_waktu.end, "HH:mm:ss") : null
    );

    const { data, setData, post, processing, errors } = useForm({
        start: data_waktu?.start || null,
        end: data_waktu?.end || null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/rooms/waktu/update/${data_waktu.id}`);
    };

    return (
        <AdminLayout>
            <Head title="Edit Waktu" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                    <div className="flex justify-between py-3">
                        <h2 className="text-2xl font-semibold">Edit</h2>
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
                            <li className="text-primary2-600">Edit</li>
                        </ul>
                    </div>
                    <section>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-y-3">
                                <div className="flex flex-row gap-x-3">
                                    <TimePicker
                                        label="Start"
                                        value={start}
                                        onChange={(newValue) => {
                                            setStart(newValue);
                                            setData(
                                                "start",
                                                newValue?.format("HH:mm:ss")
                                            );
                                        }}
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
                                        value={end}
                                        onChange={(newValue) => {
                                            setEnd(newValue);
                                            setData(
                                                "end",
                                                newValue?.format("HH:mm:ss")
                                            );
                                        }}
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
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center justify-center text-white bg-primary2-700 hover:bg-primary2-800 focus:ring-4 focus:ring-primary2-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary2-600 dark:hover:bg-primary2-700 focus:outline-none dark:focus:ring-primary2-800"
                                    >
                                        {processing ? "Saving..." : "Simpan"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </section>
            </LocalizationProvider>
        </AdminLayout>
    );
};

export default EditWaktu;
