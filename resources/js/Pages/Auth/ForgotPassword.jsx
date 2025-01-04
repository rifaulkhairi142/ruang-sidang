import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Lupa kata sandi? Tidak masalah. Cukup beri tahu kami alamat
                email Anda dan kami akan mengirimkan tautan untuk menyetel ulang
                kata sandi melalui email yang akan memungkinkan Anda memilih
                kata sandi baru.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
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
                    className="mt-1 block w-full"
                    focused
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
