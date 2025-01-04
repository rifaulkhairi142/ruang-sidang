import StudentLayout from "@/Layouts/Students/StudentLayout";
import { Head, router } from "@inertiajs/react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineMeetingRoom } from "react-icons/md";
import nodata from "../../../../public/images/logo/nodata-found 1.png";

const History = ({ booking }) => {
    const [open, setOpen] = React.useState(false);
    const [idPesanan, setIdPesanan] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        router.post(`/history/pesanan/delete/${idPesanan}`);
        handleClose();
    };
    return (
        <StudentLayout>
            <Head title="History" />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Konfirmasi"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Apakah kamu yakin ingin menghapus riwayat pesanan
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        size="small"
                        autoFocus
                        disableElevation
                    >
                        No
                    </Button>
                    <Button
                        onClick={() => handleConfirm()}
                        variant="outlined"
                        disableElevation
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="w-full bg-white gap-y-3 rounded-xl text-lg px-5 font-semibold flex flex-col">
                <h1 className="text-lg font-semibold font-satoshi text-green">
                    History
                </h1>
                <hr />
                <div className="flex flex-col gap-y-3">
                    {booking.length > 0 ? (
                        booking.map((itm) => (
                            <div className="flex w-full h-full rounded-lg px-5 pt-2 pb-5 bg-white border shadow-2 flex-col gap-y-3">
                                <div className="flex w-full justify-end">
                                    <IconButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClickOpen();
                                            setIdPesanan(itm.id);
                                        }}
                                    >
                                        <FaRegTrashAlt className="text-title-sm" />
                                    </IconButton>
                                </div>
                                <ul className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3  text-black-1 font-normal text-md gap-y-4">
                                    <li className="flex h-fit w-fit gap-x-2 items-start ">
                                        <MdOutlineMeetingRoom className="text-2xl" />
                                        <p className="">{itm.nama_ruang}</p>
                                    </li>
                                    <li className="flex h-fit w-fit gap-x-2 items-start ">
                                        <MdOutlineDateRange className="text-2xl" />
                                        <p className="">{itm.booking_date}</p>
                                    </li>
                                    <li className="flex h-fit w-fit gap-x-2 items-start ">
                                        <MdAccessTime className="text-2xl" />
                                        <p className="">{`${itm.start} s.d ${itm.end}`}</p>
                                    </li>
                                </ul>
                                <hr className="mt-3" />
                                <div>
                                    <ul className="gap-y-2 gap-x-2 grid grid-cols-2">
                                        <li className="text-md">
                                            <ul className="font-satoshi font-normal">
                                                <p className="bg-primary2-500/15 text-primary w-fit p-1 rounded-md ">
                                                    Ketua Sidang
                                                </p>
                                                <li className="font-normal font-satoshi  ml-2">
                                                    {itm.nama_ketua}
                                                </li>
                                                <li className="font-normal font-satoshi ml-2">
                                                    NIP/NIDN.{" "}
                                                    {itm.username_ketua}
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="text-md">
                                            <ul className="font-satoshi">
                                                <p className="bg-primary2-500/15 text-primary font-normal w-fit p-1 rounded-md ">
                                                    Sekretaris Sidang
                                                </p>
                                                <li className="font-normal font-satoshi  ml-2">
                                                    {itm.nama_sekretaris}
                                                </li>
                                                <li className="font-normal font-satoshi ml-2">
                                                    NIP/NIDN.{" "}
                                                    {itm.username_sekretaris}
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="text-md">
                                            <ul className="font-satoshi ">
                                                <p className="bg-primary2-500/15 text-primary font-normal w-fit p-1 rounded-md ">
                                                    Penguji 1
                                                </p>
                                                <li className="font-normal font-satoshi  ml-2">
                                                    {itm.nama_penguji1}
                                                </li>
                                                <li className="font-normal font-satoshi ml-2">
                                                    NIP/NIDN.{" "}
                                                    {itm.username_penguji_1}
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="text-md">
                                            <ul className="font-satoshi">
                                                <p className="bg-primary2-500/15 text-primary font-normal w-fit p-1 rounded-md ">
                                                    Penguji 2
                                                </p>
                                                <li className="font-normal font-satoshi  ml-2">
                                                    {itm.nama_penguji2}
                                                </li>
                                                <li className="font-normal font-satoshi ml-2">
                                                    NIP/NIDN.{" "}
                                                    {itm.username_penguji_2}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center w-full h-full justify-center">
                            <img
                                src={nodata}
                                alt="No Data Found"
                                className="max-w-55"
                            ></img>
                            <p>No Data Found</p>
                        </div>
                        // <p>Kamu Belum Memesan Ruangan</p>
                    )}
                    {booking.map((itm) => {})}
                </div>
            </div>
        </StudentLayout>
    );
};

export default History;
