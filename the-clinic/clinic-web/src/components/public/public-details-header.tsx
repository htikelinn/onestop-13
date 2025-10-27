import IconComponent from "@/components/app/icon-component"
import { LucideIconType } from "@/lib/model/auth.model"

type PublicDetailsHeaderProps = {
    icon: LucideIconType
    title: string
    subTitle: string
}

export default function PublicDetailsHeader({icon, title, subTitle} : PublicDetailsHeaderProps) {
    return (
        <header className="space-y-4 pt-8">
            <div className="flex gap-2 items-center justify-center">
                <IconComponent className="size-6" name={icon} />
                <h1 className="text-2xl">{title}</h1>
            </div>
            <p className="text-muted-foreground px-48 text-center">{subTitle}</p>
        </header>
    )
}