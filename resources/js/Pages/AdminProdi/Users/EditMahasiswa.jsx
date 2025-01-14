import InputError from "@/Components/InputError";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { IoOpenOutline } from "react-icons/io5";

const EditMahasiswa = ({ mahasiswa }) => {
    const name = mahasiswa?.name || null;
    const email = mahasiswa?.email || null;
    const username = mahasiswa?.username || null;
    const [status, setStatus] = useState(mahasiswa.status || null);
    const [message, setMessage] = useState(mahasiswa.message || null);

    const { data, setData, post, processing, errors } = useForm({
        status: mahasiswa?.status,
        message: mahasiswa?.message,
    });
    return (
        <AdminLayout>
            <Head title={`${mahasiswa?.name || "Edit Dosen"}`} />
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
                                    router.visit("/admin/users/student")
                                }
                            >
                                Mahasiswa
                            </li>
                            <li>{">"}</li>
                            <li className="text-primary2-600">Edit</li>
                        </ul>
                    </div>
                    <section>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-col  gap-3">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        fullWidth
                                        disabled
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
                                        value={username}
                                        disabled
                                        label="NIM"
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

                                <div className="flex flex-col w-full">
                                    <TextField
                                        fullWidth
                                        value={email}
                                        disabled
                                        label="NIM"
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
                                {mahasiswa.link_nota ? (
                                    <div className="">
                                        <a
                                            className="bg-primary2-500 gap-x-2 py-1 px-2 rounded-md text-white flex flex-row items-center w-fit"
                                            target="_blank"
                                            href={`/storage/${mahasiswa.link_nota}`}
                                        >
                                            {mahasiswa?.link_nota
                                                .split("/")
                                                .pop()}
                                            <IoOpenOutline className="text-title-sm" />
                                        </a>
                                    </div>
                                ) : (
                                    <p>Nota Belum Diupload</p>
                                )}

                                <div className="flex flex-row  gap-x-3">
                                    <div className="flex flex-col w-full">
                                        <TextField
                                            fullWidth
                                            value={message}
                                            multiline
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                                setData(
                                                    "message",
                                                    e.target.value
                                                );
                                            }}
                                            rows={4}
                                            label="Message"
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
                                    <FormControl sx={{ width: "200px" }}>
                                        <InputLabel id="status-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            labelId="status-label"
                                            id="select-status"
                                            value={status}
                                            label="Age"
                                            onChange={(e) => {
                                                setStatus(e.target.value);
                                                setData(
                                                    "status",
                                                    e.target.value
                                                );
                                            }}
                                        >
                                            <MenuItem value={1}>
                                                In Review
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                Revisi
                                            </MenuItem>
                                            <MenuItem value={3}>Tolak</MenuItem>
                                            <MenuItem value={4}>
                                                Terima
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    class="flex items-center justify-center text-white bg-primary2-700 hover:bg-primary2-800 focus:ring-4 focus:ring-primary2-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary2-600 dark:hover:bg-primary2-700 focus:outline-none dark:focus:ring-primary2-800"
                                    onClick={(e) =>
                                        post(
                                            `/admin/users/student/update/${mahasiswa?.username}`
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

export default EditMahasiswa;
