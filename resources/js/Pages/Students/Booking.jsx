import StudentLayout from "@/Layouts/Students/StudentLayout";

import { Head, router } from "@inertiajs/react";
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Button,
    Step,
    StepButton,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { useState } from "react";
import { ThreeDot } from "react-loading-indicators";

const steps = ["Pilih Ruang", "Detail Sidang", "Booking"];

const Booking = ({ rooms, dosen, waktu, base_url, auth }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [room, setRoom] = useState(null);
    const [bookingDate, setBookingDate] = useState(null);
    const [penguji1, setPenguji1] = useState(null);
    const [penguji2, setPenguji2] = useState(null);
    const [sektretaris, setSektretaris] = useState(null);
    const [ketua, setKetua] = useState(null);
    const [slotWaktu, setSlotWaktu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [payload, setPayload] = useState({
        room_id: null,
        booking_date: null,
        start: null,
        end: null,
        username_penguji_1: null,
        username_penguji_2: null,
        username_sekretaris: null,
        username_ketua: null,
        username_mahasiswa: auth?.user?.username,
    });

    const proceedBooking = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${base_url}/api/booking/proceed`,
                payload
            );
            setData(response.data);
            if (response?.data?.status === "success") {
                router.visit("/history");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
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
            <div className="bg-white px-10 rounded-xl flex flex-col gap-y-3 ">
                <h1 className="text-lg font-semibold font-satoshi text-green">
                    Booking Ruangan
                </h1>
                <hr />
                {data?.status === "error" && (
                    <div>
                        <Alert severity="error">
                            <AlertTitle>Gagal</AlertTitle>
                            <ul className="list-disc pl-5">
                                {data?.errors?.general && (
                                    <li>{data?.errors?.general}</li>
                                )}
                                {data?.errors?.room_id && (
                                    <li>Ruangan :{data?.errors?.room_id}</li>
                                )}
                                {data?.errors?.booking_date && (
                                    <li>
                                        Tanggal Sidang :
                                        {data?.errors?.booking_date}
                                    </li>
                                )}

                                {data?.errors?.start && (
                                    <li>
                                        Waktu Sidang:
                                        {data?.errors?.start}
                                    </li>
                                )}
                                {data?.errors?.end && (
                                    <li>
                                        Waktu Sidang:
                                        {data?.errors?.end}
                                    </li>
                                )}

                                {data?.errors?.username_ketua && (
                                    <li>
                                        Ketua Sidang:
                                        {data?.errors?.username_ketua}
                                    </li>
                                )}
                                {data?.errors?.username_sekretaris && (
                                    <li>
                                        Sekretaris Sidang:
                                        {data?.errors?.username_sekretaris}
                                    </li>
                                )}

                                {data?.errors?.username_penguji_1 && (
                                    <li>
                                        Penguji 1:
                                        {data?.errors?.username_penguji_1}
                                    </li>
                                )}
                                {data?.errors?.username_penguji_2 && (
                                    <li>
                                        Penguji 2:
                                        {data?.errors?.username_penguji_2}
                                    </li>
                                )}
                            </ul>
                        </Alert>
                    </div>
                )}

                <div className="w-full flex-col flex gap-y-3">
                    <Autocomplete
                        id="room"
                        value={room}
                        required
                        getOptionLabel={(option) => option.name}
                        options={rooms}
                        onChange={(e, value) => {
                            setRoom(value);
                            setPayload({ ...payload, room_id: value.id });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ruangan"
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
                        )}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Tanggal Sidang"
                            value={bookingDate}
                            onChange={(value) => {
                                setBookingDate(value);
                                setPayload({ ...payload, booking_date: value });
                            }}
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
                    </LocalizationProvider>
                    <div className="flex flex-row gap-x-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Waktu Mulai"
                                value={start}
                                onChange={(value) => {
                                    setStart(value);
                                    setPayload({
                                        ...payload,
                                        start: value,
                                    });
                                }}
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
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Waktu Selesai"
                                value={end}
                                onChange={(value) => {
                                    setEnd(value);
                                    setPayload({
                                        ...payload,
                                        end: value,
                                    });
                                }}
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
                            />
                        </LocalizationProvider>
                    </div>

                    <Autocomplete
                        id="ketua"
                        value={ketua}
                        required
                        getOptionLabel={(option) => option.name}
                        options={dosen}
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
                                label="Ketua"
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
                        )}
                        fullWidth
                    />
                    <Autocomplete
                        id="sektretaris"
                        value={sektretaris}
                        required
                        getOptionLabel={(option) => option.name}
                        options={dosen}
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
                                label="Sektretaris"
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
                        )}
                        fullWidth
                    />
                    <Autocomplete
                        id="penguji1"
                        value={penguji1}
                        required
                        getOptionLabel={(option) => option.name}
                        options={dosen}
                        onChange={(e, value) => {
                            setPenguji1(value);
                            console.log("penguji1 : ", value);
                            setPayload({
                                ...payload,
                                username_penguji_1: value.nip,
                            });
                            console.log(payload);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Penguji 1"
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
                        )}
                        fullWidth
                    />
                    <Autocomplete
                        id="penguji2"
                        value={penguji2}
                        required
                        getOptionLabel={(option) => option.name}
                        options={dosen}
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
                        )}
                        fullWidth
                    />
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
            </div>
        </StudentLayout>
    );
};

export default Booking;
