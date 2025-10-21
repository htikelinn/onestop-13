import { LucideIconType } from "@/lib/model/auth.model";
import * as lucideIcons from 'lucide-react'

export default function IconComponent({name, className} : {name: LucideIconType, className?: string}) {
    const Icon = lucideIcons[name] as lucideIcons.LucideIcon

    return (
        <Icon className={className} />
    )
}