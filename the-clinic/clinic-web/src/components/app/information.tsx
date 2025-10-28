import { LucideIconType } from "@/lib/model/auth.model";
import IconComponent from "./icon-component";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";

export default function Information({icon, title, value} : {icon : LucideIconType, title : string, value : string}) {
    return (
        <Item variant={'outline'}>
            <ItemMedia>
                <IconComponent name={icon} />
            </ItemMedia>

            <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{value}</ItemDescription>
            </ItemContent>
        </Item>
    )
}