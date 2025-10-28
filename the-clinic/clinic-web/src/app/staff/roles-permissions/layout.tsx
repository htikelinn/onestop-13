import PermissionLoader from "@/components/app/permission-loader";
import React from "react";

export default function StaffLayout({children} : {children : React.ReactNode}) {
    return (
        <>
            <PermissionLoader path="/staff/roles-permissions" />
            {children}
        </>
    )
}