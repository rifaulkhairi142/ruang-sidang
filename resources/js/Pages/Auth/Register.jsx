import { useEffect } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import gambar from "../../../../public/images/logo/landmark-uinar-scaled.jpg";

import { useState } from "react";

export default function Register({ flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassowrd, setShowConfirmPassoword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassoword((show) => !show);
    const handleCloseNotify = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setNotify(false);
    };
    return (
        <div className="grid grid-cols-1 font-satoshi md:grid-cols-2 items-center w-full h-screen bg-white/90">
            <Head title="Register" />

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
                            Register
                        </h1>

                        <div className="mt-4">
                            <TextField
                                id="name"
                                type="text"
                                label="Nama"
                                value={data.name}
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
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <FormControl
                                sx={{ width: "100%" }}
                                variant="outlined"
                            >
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
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
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
                        <div className="mt-4">
                            <FormControl
                                sx={{ width: "100%" }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-confirm-password">
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    id="confirm_password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    value={data.password_confirmation}
                                    type={
                                        showConfirmPassowrd
                                            ? "text"
                                            : "password"
                                    }
                                    sx={{
                                        width: "100%",

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
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowConfirmPassword
                                                }
                                                edge="end"
                                            >
                                                {showConfirmPassowrd ? (
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
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {/* <div className="mt-4">
                            <FormControlLabel
                                control={<Checkbox required name="gilad" />}
                                label="Dengan ini saya bersedia mengikuti Program hingga selesai jika diterima. Jika saya mengundurkan diri maka saya siap untuk tidak mengikuti PPKPM di semester selanjutnya"
                            />
                        </div> */}

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href={route("login")}
                                className=" text-sm text-yellow-600 hover:text-yellow-600/50 rounded-md  "
                            >
                                Sudah Punya Akun?
                            </Link>

                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
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
