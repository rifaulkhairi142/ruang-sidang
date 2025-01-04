import InputError from "@/Components/InputError";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

const EditProdi = ({ prodi }) => {
    const [name, setName] = useState(prodi?.name || null);
    const [code, setCode] = useState(prodi?.kode || null);

    const { data, setData, post, processing, errors } = useForm({
        name: prodi?.name,
        kode: prodi?.kode,
    });
    return (
        <AdminLayout>
            <Head title={`${prodi?.name || "Edit Prodi"}`} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <section class="bg-white border dark:bg-gray-900 p-3 sm:p-5">
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
                                    router.visit("/admin/data/prodi")
                                }
                            >
                                Prodi
                            </li>
                            <li>{">"}</li>
                            <li className="text-primary2-600">Edit</li>
                        </ul>
                    </div>
                    <section>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row gap-x-3">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        fullWidth
                                        value={name}
                                        label="Nama"
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
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            setData("name", e.target.value);
                                        }}
                                    />
                                    {errors.name && (
                                        <InputError message={errors.message} />
                                    )}
                                </div>
                                <div className="flex flex-col w-full">
                                    <TextField
                                        fullWidth
                                        value={code}
                                        label="Code"
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
                                        onChange={(e) => {
                                            setNIP(e.target.value);
                                            setData("kode", e.target.value);
                                        }}
                                    />
                                    {errors.kode && (
                                        <InputError message={errors.kode} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    class="flex items-center justify-center text-white bg-primary2-700 hover:bg-primary2-800 focus:ring-4 focus:ring-primary2-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary2-600 dark:hover:bg-primary2-700 focus:outline-none dark:focus:ring-primary2-800"
                                    onClick={(e) =>
                                        post(
                                            `/admin/data/prodi/update/${prodi?.id}`
                                        )
                                    }
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </div>
                    </section>
                </section>
            </LocalizationProvider>
        </AdminLayout>
    );
};

export default EditProdi;
