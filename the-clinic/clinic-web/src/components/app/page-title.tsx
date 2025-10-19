import React from "react";

import * as lucideIcons from "lucide-react";

type IconName = keyof typeof lucideIcons

export default function PageTitle({icon, name} : {icon : IconName , name: string}) {

    const IconType = lucideIcons[icon] as lucideIcons.LucideIcon

    return (
        <div className="flex items-center gap-2 mb-4">
            <IconType className="size-6" /> 
            <span className="text-2xl">{name}</span>
        </div>
    )
}