import StudentLayout from "@/Layouts/Students/StudentLayout";
import { Head, usePage } from "@inertiajs/react";
import { Alert, AlertTitle, Button, styled, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { ThreeDot } from "react-loading-indicators";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const Profile = ({ base_url }) => {
    const user = usePage().props.auth.user;
    const [fileToUpload, setFileToUpload] = useState(null);
    const [nota, setNota] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState(null);
    const [params, setParams] = useState({
        nota: null,
        username: user?.username,
    });

    const [userData, setUserData] = useState([]);

    const handleNotaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setError("Only PDF files are allowed");
                return;
            }
            if (file.size > 500 * 1024) {
                setError("File size must not exceed 500kb");
                return;
            }
            setNota(file);
            setParams({ ...params, nota: file });
            setError(null);
        }
    };

    const getProfileData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${base_url}/api/profile`, {
                params: { username: user?.username },
            });
            setUserData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    const submitProfile = async () => {
        if (params.nota !== null) {
            setLoading(true);

            try {
                const formData = new FormData();
                formData.append("nota", params.nota);
                formData.append("username", params.username);

                const response = await axios.post(
                    `${base_url}/api/profile/update`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                getProfileData();
                console.log("Profile updated successfully:", response);
            } catch (err) {
                console.error("Error updating profile:", err);
                setError(
                    err.response?.data?.message || "Failed to update profile"
                );
            } finally {
                setLoading(false);
            }
        } else {
            setError("File nota wajib diupload");
        }
    };

    return (
        <StudentLayout>
            <Head title="Booking" />
            {loading && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-white/70">
                    <ThreeDot color="#4F61E3" size="medium" />
                </div>
            )}
            <div className="w-full bg-white gap-y-3 rounded-xl text-lg px-5 font-semibold flex flex-col">
                <h1 className="text-lg font-semibold font-satoshi text-green">
                    Profil
                </h1>
                <hr />
                {err && <Alert severity="error">{err}</Alert>}
                {(userData.link_nota === null || userData.status === "5") && (
                    <Alert severity="warning">
                        <AlertTitle>Info</AlertTitle>
                        Silakan mengunggah file nota. Pastikan menggunakan
                        laptop.
                    </Alert>
                )}
                {userData.status === "3" ||
                    (userData.message === "2" && (
                        <Alert severity="info">
                            <AlertTitle>Info</AlertTitle>
                            {userData?.message}
                        </Alert>
                    ))}
                {userData.status === "1" && (
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Profilmu sedang direview
                    </Alert>
                )}
                {userData.status === "4" && (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Biodatamu telah disetujui silakan booking Ruangan dan
                        jadwal sidang
                    </Alert>
                )}

                <div className="flex flex-col gap-y-3">
                    <TextField
                        label="Email"
                        type="email"
                        value={user?.email}
                        disabled
                        fullWidth
                    />
                    <TextField
                        label="Name"
                        type="text"
                        value={user?.name}
                        disabled
                        fullWidth
                    />
                    <TextField
                        label="NIM"
                        type="text"
                        value={user?.username}
                        disabled
                        fullWidth
                    />
                    <div className="flex flex-col gap-y-2">
                        {userData?.link_nota && (
                            <a
                                href={`/storage/${userData.link_nota}`}
                                target="_blank"
                                className="font-normal flex items-center gap-x-2 bg-primary2-400/10 w-fit px-3 py-1 rounded-md cursor-pointer"
                            >
                                {userData.link_nota.split("/").pop()}
                                <RiAttachment2 className="text-lg" />
                            </a>
                        )}
                        {nota && (
                            <a
                                href="#"
                                className="font-normal flex items-center gap-x-2 bg-primary2-400/10 w-fit px-3 py-1 rounded-md cursor-pointer"
                            >
                                {nota.name}
                                <RiAttachment2 className="text-lg" />
                            </a>
                        )}
                        <Button
                            variant="outlined"
                            sx={{ textTransform: "capitalize", width: "200px" }}
                            component="label"
                            startIcon={<IoCloudUploadOutline />}
                        >
                            Upload Nota
                            <VisuallyHiddenInput
                                type="file"
                                accept="application/pdf"
                                onChange={(event) => handleNotaChange(event)}
                            />
                        </Button>
                    </div>
                </div>
                <div>
                    <Button
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        disableElevation
                        onClick={submitProfile}
                    >
                        Simpan
                    </Button>
                </div>
            </div>
        </StudentLayout>
    );
};

export default Profile;
