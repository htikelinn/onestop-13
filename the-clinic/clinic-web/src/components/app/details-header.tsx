import Link from "next/link"
import { Button } from "../ui/button"
import IconComponent from "./icon-component"
import { Pencil } from "lucide-react"
import { LucideIconType } from "@/lib/model/auth.model"

type DetailsHeaderPops = {
    icon: LucideIconType
    title: string
    subTitle: string
    deleted: boolean
    editPath: string
}

export default function DetailsHeader({icon, title, subTitle, deleted, editPath} : DetailsHeaderPops) {
    return (
        <h1 className="flex justify-between items-center">
            <div className="flex items-center-safe gap-3">
                <IconComponent name={icon} className="size-6" />
                <div>
                    <span className="text-xl block">{title}</span>
                    <span>{subTitle}</span> - <span>{deleted ? "Deleted" : "Active"}</span>
                </div>
            </div>

            <Button asChild>
                <Link href={editPath}>
                    <Pencil /> Edit
                </Link>
            </Button>
        </h1>
    )
}