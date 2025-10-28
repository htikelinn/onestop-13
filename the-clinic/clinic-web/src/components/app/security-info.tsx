import { UserCheck } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { LucideIconType } from "@/lib/model/auth.model";
import IconComponent from "./icon-component";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "../ui/item";

export default function SecurityInfo({createdAt, createdBy, modifiedAt, modifiedBy} : {createdAt: string, createdBy: string, modifiedAt: string, modifiedBy: string}) {
    return (
        <section>
            <h3 className="text-xl"> 
                Security Information
            </h3>
            <div className="grid grid-cols-3 mt-4 gap-4">
                <Information icon="UserPlus" title="Created By" by={createdBy} at={createdAt} />
                <Information icon="UserCheck" title="Modified By" by={modifiedBy} at={modifiedAt} />
            </div>
        </section>
    )
}


function Information({icon, title, at, by} : {icon: LucideIconType, title: string, at: string, by : string}) {
    return (
        <Item variant={'outline'}>
            <ItemHeader>{title}</ItemHeader>
            <ItemMedia>
                <IconComponent name={icon} />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{by}</ItemTitle>
                <ItemDescription>{at}</ItemDescription>
            </ItemContent>
        </Item>
    )
}