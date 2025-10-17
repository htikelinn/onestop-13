import { LucideIcon } from "lucide-react";
import React from "react";

export default function PageTitle({icon, name} : {icon : React.ReactNode, name: string}) {
    return (
        <div className="flex items-center gap-2 mb-4">
            {icon} {name}
        </div>
    )
}