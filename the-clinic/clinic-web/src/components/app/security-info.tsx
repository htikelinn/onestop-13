import { UserCheck } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { LucideIconType } from "@/lib/model/auth.model";
import IconComponent from "./icon-component";

export default function SecurityInfo({createdAt, createdBy, modifiedAt, modifiedBy} : {createdAt: string, createdBy: string, modifiedAt: string, modifiedBy: string}) {
    return (
        <section>
            <h3 className="text-xl"> 
                Security Information
            </h3>
            <div className="grid grid-cols-2 mt-4 gap-4">
                <Information icon="UserPlus" title="Created By" by={createdBy} at={createdAt} />
                <Information icon="UserCheck" title="Modified By" by={modifiedBy} at={modifiedAt} />
            </div>
        </section>
    )
}


function Information({icon, title, at, by} : {icon: LucideIconType, title: string, at: string, by : string}) {
    return (
        <div className="border p-4 rounded-lg flex gap-4 items-center">
            <IconComponent name={icon} />

            <div>
                <div className="text-foreground/70 text-sm">{title}</div>
                <div>{by}</div>
                <div className="text-foreground/80 text-sm">{at}</div>
            </div>
        </div>
    )
}