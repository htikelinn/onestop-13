import PermissionLoader from "@/components/app/permission-loader";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "The Clinic | Appointment",
  description: "Appointment management for The Clinic",
};


export default function StaffLayout({children} : {children : React.ReactNode}) {
    return (
        <>
            <PermissionLoader path="/staff/appointment" />
            {children}
        </>
    )
}