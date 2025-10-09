import { LucideIconType } from "@/lib/model/auth-model";
import * as lucides from "lucide-react"

export default function SectionTitle({title, icon} : {title: string, icon? : LucideIconType}) {
    
    if(icon) {
        const IconComponent = lucides[icon] as lucides.LucideIcon
        return (
            <h1 className="flex gap-2 items-center text-2xl">
                <IconComponent className="size-6"></IconComponent> {title}
            </h1>
        )
    }
    
    return (
        <h1 className="text-2xl">
            {title}
        </h1>
    )
}