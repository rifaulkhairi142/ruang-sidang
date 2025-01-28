import InputError from "@/Components/InputError";
import AdminLayout from "@/Layouts/AdminProdi/AdminLayout";
import { Head, router, usePage } from "@inertiajs/react";
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Button,
    Chip,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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

const AddReservasi = ({
    base_url,
    message,
    props,
    data_prodi,
    data_dosen,
    data_waktu,
    data_ruang,
    data_opt,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [studentName, setStudentName] = useState(null);
    const [studentNIM, setStudentNIM] = useState(null);
    const [nota, setNota] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const [room, setRoom] = useState(null);
    const [waktu, setWaktu] = useState(null);
    const [penguji1, setPenguji1] = useState(null);
    const [penguji2, setPenguji2] = useState(null);
    const [sektretaris, setSektretaris] = useState(null);
    const [ketua, setKetua] = useState(null);
    const [prodi, setProdi] = useState(data_opt.id_prodi);
    const [validation, setValidation] = useState({
        student_name: null,
        student_nim: null,
        student_id_prodi: null,
        booking_date: null,
        room_id: null,
        time_slot_id: null,
        username_penguji_1: null,
        username_penguji_2: null,
        username_sektretaris: null,
        username_ketua: null,
        nota: null,
    });

    const [payload, setPayload] = useState({
        student_name: null,
        student_nim: null,
        student_id_prodi: null,
        booking_date: null,
        room_id: null,
        time_slot_id: null,
        username_penguji_1: null,
        username_penguji_2: null,
        username_sekretaris: null,
        username_ketua: null,
        nota: null,
    });
    const handleNotaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== "application/pdf") {
                setValidation({
                    ...validation,
                    nota: "Only PDF Files are allowed",
                });

                return;
            }
            if (file.size > 500 * 1024) {
                setError("File size must not exceed 500kb");
                setValidation({
                    ...validation,
                    nota: "File size must not exceed 500kb",
                });

                return;
            }
            setNota(file);
            setPayload({ ...payload, nota: file });
            setValidation({
                ...validation,
                nota: null,
            });
        }
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

    const proceedBooking = async () => {
        setLoading(true);

        if (payload.student_nim === null) {
            setValidation({
                ...validation,
                student_nim: "Nim Mahasiswa Wajib Diisi",
            });
            setLoading(false);
            return;
        }

        try {
            console.log(prodi);
            const formData = new FormData();
            formData.append("nota", payload.nota);
            formData.append("student_name", payload.student_name);
            formData.append("student_nim", payload.student_nim);
            formData.append("student_id_prodi", prodi);
            formData.append("booking_date", payload.booking_date);
            formData.append("room_id", payload.room_id);
            formData.append("time_slot_id", payload.time_slot_id);
            formData.append("username_penguji_1", payload.username_penguji_1);
            formData.append("username_penguji_2", payload.username_penguji_2);
            formData.append("username_ketua", payload.username_ketua);
            formData.append("username_sekretaris", payload.username_sekretaris);
            const response = await axios.post(
                `${base_url}/api/operator-prodi/booking/proceed`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setData(response.data);
            if (response?.data?.status === "success") {
                router.visit("/operator-prodi/rooms/reservasi");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <Head title="Make Reservastion" />
            {loading && (
                <div className="fixed inset-0 z-99999 flex items-center justify-center bg-white/70">
                    <ThreeDot color="#4F61E3" size="medium" />
                </div>
            )}
            <section class="bg-white border  dark:bg-gray-900 p-3 sm:p-5">
                <div className="flex flex-col gap-y-3">
                    {data?.status === "error" && (
                        <div>
                            <Alert severity="error">
                                <AlertTitle>Gagal</AlertTitle>
                                <ul className="list-disc pl-5">
                                    {Object.entries(data.errors).map(
                                        ([key, message]) =>
                                            message ? (
                                                <li key={key}>{message}</li>
                                            ) : null
                                    )}
                                </ul>
                            </Alert>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className>
                            <TextField
                                value={studentName}
                                onChange={(e) => {
                                    setStudentName(e.target.value);
                                    setPayload({
                                        ...payload,
                                        student_name: e.target.value,
                                    });
                                }}
                                label="Nama Mahasiswa"
                                fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-root.Mui-focused": {
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
                            <TextField
                                value={studentNIM}
                                onChange={(e) => {
                                    setStudentNIM(e.target.value);
                                    setPayload({
                                        ...payload,
                                        student_nim: e.target.value,
                                    });
                                    if (e.target.value.match(/^\d{9}$/)) {
                                        setValidation({
                                            ...validation,
                                            student_nim: null,
                                        });
                                        return;
                                    } else {
                                        setValidation({
                                            ...validation,
                                            student_nim:
                                                "Nim Berupa Numerik dengan panjang 9 digit",
                                        });
                                    }
                                }}
                                label="NIM Mahasiswa"
                                fullWidth
                                sx={{
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                    "& .MuiInputBase-input:focus": {
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                }}
                            />
                            {validation.student_nim && (
                                <InputError message={validation.student_nim} />
                            )}
                        </div>
                        {/* <div>
                            <Autocomplete
                                id="prodi"
                                value={prodi}
                                getOptionLabel={(option) => option.name}
                                options={data_prodi}
                                onChange={(e, value) => {
                                    setProdi(value);
                                    setPayload({
                                        ...payload,
                                        student_id_prodi: value.id,
                                    });
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
                                            "& .MuiInputBase-input:focus": {
                                                outline: "none",
                                                boxShadow: "none",
                                            },
                                        }}
                                    />
                                )}
                                fullWidth
                            />
                        </div> */}
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Tanggal Sidang"
                                    value={bookingDate}
                                    onChange={(value) => {
                                        setBookingDate(value);
                                        setPayload({
                                            ...payload,
                                            booking_date: value,
                                        });
                                    }}
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
                                />
                            </LocalizationProvider>
                        </div>
                        <div>
                            <Autocomplete
                                id="room"
                                value={room}
                                getOptionLabel={(option) => option.name}
                                options={data_ruang}
                                onChange={(e, value) => {
                                    setRoom(value);
                                    setPayload({
                                        ...payload,
                                        room_id: value.id,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ruangan"
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
                                )}
                                fullWidth
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="waktu"
                                value={waktu}
                                getOptionLabel={(option) => option.name}
                                options={data_waktu}
                                onChange={(e, value) => {
                                    setWaktu(value);
                                    setPayload({
                                        ...payload,
                                        time_slot_id: value.id,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Waktu"
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
                                )}
                                fullWidth
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="ketua"
                                value={ketua}
                                getOptionLabel={(option) => option.name}
                                options={data_dosen}
                                onChange={(e, value) => {
                                    setKetua(value);
                                    setPayload({
                                        ...payload,
                                        username_ketua: value.nip,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ketua Sidang"
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
                                                {`NIP/NIDN. ${option.nip}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                                fullWidth
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="sektretaris"
                                value={sektretaris}
                                getOptionLabel={(option) => option.name}
                                options={data_dosen}
                                onChange={(e, value) => {
                                    setSektretaris(value);
                                    setPayload({
                                        ...payload,
                                        username_sekretaris: value.nip,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Sektretaris Sidang"
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
                                                {`NIP/NIDN. ${option.nip}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                                fullWidth
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="penguji1"
                                value={penguji1}
                                getOptionLabel={(option) => option.name}
                                options={data_dosen}
                                onChange={(e, value) => {
                                    setPenguji1(value);
                                    setPayload({
                                        ...payload,
                                        username_penguji_1: value.nip,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Penguji 1"
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
                                                {`NIP/NIDN. ${option.nip}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                                fullWidth
                            />
                        </div>
                        <div>
                            <Autocomplete
                                id="penguji2"
                                value={penguji2}
                                getOptionLabel={(option) => option.name}
                                options={data_dosen}
                                onChange={(e, value) => {
                                    setPenguji2(value);
                                    setPayload({
                                        ...payload,
                                        username_penguji_2: value.nip,
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Penguji 2"
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
                                                {`NIP/NIDN. ${option.nip}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                                fullWidth
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {/* {userData?.link_nota && (
                            <a
                                href={`/storage/${userData.link_nota}`}
                                target="_blank"
                                className="font-normal flex items-center gap-x-2 bg-primary2-400/10 w-fit px-3 py-1 rounded-md cursor-pointer"
                            >
                                {userData.link_nota.split("/").pop()}
                                <RiAttachment2 className="text-lg" />
                            </a>
                        )} */}
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
                                sx={{
                                    textTransform: "capitalize",
                                    width: "200px",
                                }}
                                component="label"
                                startIcon={<IoCloudUploadOutline />}
                            >
                                Upload Nota
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(event) =>
                                        handleNotaChange(event)
                                    }
                                />
                            </Button>
                            {validation.nota && (
                                <InputError message={validation.nota} />
                            )}
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            disabled={loading}
                            disableElevation
                            sx={{ textTransform: "capitalize" }}
                            variant="contained"
                            onClick={(e) => {
                                e.preventDefault();
                                proceedBooking();
                            }}
                        >
                            Buat Reservasi
                        </Button>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default AddReservasi;
