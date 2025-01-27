import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import gambar from "../../../../public/images/logo/landmark-uinar-scaled.jpg";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post("/login");
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className="grid grid-cols-1 font-satoshi md:grid-cols-2 items-center w-full h-screen bg-white/90">
            <Head title="Log in" />

            <div className="flex w-full justify-center items-center flex-col">
                <div className="flex w-full max-w-96 mb-3 items-start justify-start">
                    <img
                        className="w-28 cursor-pointer "
                        src="https://upload.wikimedia.org/wikipedia/commons/a/af/Lambang_UIN_Ar-Raniry.png"
                    />
                </div>

                <form
                    onSubmit={submit}
                    className="min-w-96 bg-white shadow-md  rounded-md p-4 max-w-min"
                >
                    <div>
                        <h1 className="text-2xl text-black-2 font-bold mb-6">
                            Login
                        </h1>
                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}
                        <TextField
                            id="email"
                            type="text"
                            label="Email"
                            value={data.email}
                            sx={{
                                width: "100%",

                                "& .MuiOutlinedInput-root.Mui-focused": {
                                    outline: "none",
                                    boxShadow: "none",
                                },
                                "& .MuiInputBase-input:focus": {
                                    outline: "none",
                                    boxShadow: "none",
                                },
                            }}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <FormControl sx={{ width: "100%" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                value={data.password}
                                type={showPassword ? "text" : "password"}
                                sx={{
                                    width: "100%",

                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                    "& .MuiInputBase-input:focus": {
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <MdOutlineVisibilityOff />
                                            ) : (
                                                <MdOutlineVisibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-row justify-between mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {/* <Link
                            href="/register"
                            className=" text-sm text-yellow-600 hover:text-yellow-600/50 rounded-md "
                        >
                            Daftar Sebagai Mahasiswa
                        </Link> */}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <img
                src={gambar}
                className="flex hidden md:block h-full w-full object-cover "
            />
        </div>
    );
}
