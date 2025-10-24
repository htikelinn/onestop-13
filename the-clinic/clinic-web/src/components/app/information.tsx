import { LucideIconType } from "@/lib/model/auth.model";
import IconComponent from "./icon-component";

export default function Information({icon, title, value} : {icon : LucideIconType, title : string, value : string}) {
    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-4">
                <IconComponent name={icon} />

                <div>
                    <div className="text-foreground/70 text-sm">{title}</div>
                    <div>{value}</div>
                </div>
            </div>
        </div>
    )
}