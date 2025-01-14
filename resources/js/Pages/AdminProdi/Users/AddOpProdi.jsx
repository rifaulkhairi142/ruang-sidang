import InputError from "@/Components/InputError";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

const AddOpProdi = ({ listProdi }) => {
    const [name, setName] = useState(null);
    const [password, setPasswrod] = useState(null);
    const [email, setEmail] = useState(null);
    const [prodi, setProdi] = useState(null);
    const [username, setUsername] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: null,
        username: null,
        email: null,
        id_prodi: null,
        password: null,
    });
    return (
        <AdminLayout>
            <Head title="Add Waktu" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <section class="bg-white broder dark:bg-gray-900 p-3 sm:p-5">
                    <div className="flex justify-between py-3">
                        <h2 className="text-xl font-semibold">Add</h2>
                        <ul className="flex gap-x-3">
                            <li
                                className="cursor-pointer"
                                onClick={() => router.visit("/admin/dashboard")}
                            >
                                Dashboard kjh
                            </li>
                            <li>{"/"}</li>
                            <li
                                className="cursor-pointer"
                                onClick={() =>
                                    router.visit("/admin/users/operator-prodi")
                                }
                            >
                                Operator Prodi
                            </li>
                            <li>{"/"}</li>
                            <li className="text-primary2-600">Add</li>
                        </ul>
                    </div>
                    <section>
                        <div className="flex flex-col gap-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                                <div>
                                    <TextField
                                        fullWidth
                                        value={name}
                                        label="Nama"
                                        onChange={(e) => {
                                            setData("name", e.target.value);
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
                                    {errors.name && (
                                        <InputError message={errors.name} />
                                    )}
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        value={email}
                                        label="Email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
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
                                    {errors.email && (
                                        <InputError message={errors.email} />
                                    )}
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        value={username}
                                        label="Username"
                                        onChange={(e) => {
                                            setData("username", e.target.value);
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
                                    {errors.username && (
                                        <InputError message={errors.username} />
                                    )}
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        value={password}
                                        label="Password"
                                        onChange={(e) => {
                                            setPasswrod(e.target.value);
                                            setData("password", e.target.value);
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
                                    {errors.password && (
                                        <InputError message={errors.password} />
                                    )}
                                </div>
                                <div>
                                    <Autocomplete
                                        id="prodi"
                                        value={prodi}
                                        required
                                        getOptionLabel={(option) => option.name}
                                        options={listProdi}
                                        onChange={(e, value) => {
                                            setProdi(value);
                                            setData("id_prodi", value.id);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Prodi"
                                                sx={{
                                                    "& .MuiOutlinedInput-root.Mui-focused":
                                                        {
                                                            outline: "none",
                                                            boxShadow: "none",
                                                        },
                                                    "& .MuiInputBase-input:focus":
                                                        {
                                                            outline: "none",
                                                            boxShadow: "none",
                                                        },
                                                }}
                                            />
                                        )}
                                        renderOption={(props, option) => (
                                            <Box
                                                {...props}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    p: 1,
                                                }}
                                            >
                                                <Box sx={{ textAlign: "left" }}>
                                                    <Typography variant="body1">
                                                        {option.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        Alias: {option.kode}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        fullWidth
                                    />
                                    {errors.id_prodi && (
                                        <InputError message={errors.id_prodi} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    class="flex items-center justify-center text-white bg-primary2-700 hover:bg-primary2-800 focus:ring-4 focus:ring-primary2-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary2-600 dark:hover:bg-primary2-700 focus:outline-none dark:focus:ring-primary2-800"
                                    onClick={(e) =>
                                        post("/admin/users/operator-prodi/save")
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

export default AddOpProdi;
