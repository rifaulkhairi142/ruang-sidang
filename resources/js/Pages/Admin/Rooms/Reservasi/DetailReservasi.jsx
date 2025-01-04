import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

const DetailReservasi = ({ booking }) => {
    const [name, setName] = useState(booking?.name || null);

    return (
        <AdminLayout>
            <Head title="Add Waktu" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <section class="bg-white border dark:bg-gray-900 p-3 sm:p-5">
                    <div className="flex justify-between py-3">
                        <h2 className="text-2xl font-semibold">Detail</h2>
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
                                    router.visit("/admin/rooms/reservasi")
                                }
                            >
                                Reservasi
                            </li>
                            <li>{">"}</li>
                            <li className="text-primary2-600">Detail</li>
                        </ul>
                    </div>
                    <section>
                        <div className="flex flex-col h-fit gap-y-4">
                            <div className="">
                                <h2 className="font-semibold">Mahasiwa</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Nama
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.nama_mahasiswa}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                NIM
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.username_mahasiswa}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <h2 className="font-semibold">Reservasi</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Nama Ruangan
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.nama_ruang}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Tanggal
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.booking_date}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Jam
                                            </td>
                                            <td className="align-top text-left">
                                                {`${booking?.start} s.d ${booking?.end}`}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <h2 className="font-semibold">Ketua Sidang</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Nama
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.nama_ketua}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                NIP/NIDN
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.username_ketua}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <h2 className="font-semibold">
                                    Sektretaris Sidang
                                </h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Nama
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.nama_sekretaris}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                NIP/NIDN
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.username_sekretaris}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <h2 className="font-semibold">Penguji 1</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Nama
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.nama_penguji1}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                NIP/NIDN
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.username_penguji_1}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <h2 className="font-semibold">Penguji 2</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                Nama
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.nama_penguji2}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-top text-right pr-3">
                                                NIP/NIDN
                                            </td>
                                            <td className="align-top text-left">
                                                {booking?.username_penguji_2}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </section>
            </LocalizationProvider>
        </AdminLayout>
    );
};

export default DetailReservasi;
