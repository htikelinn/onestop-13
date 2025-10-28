import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { Spinner } from "../ui/spinner";

export default function Loading({data} : {data : string}) {
    return (
        <Item>
            <ItemMedia>
                <Spinner />
            </ItemMedia>

            <ItemContent>
                <ItemTitle>Loading</ItemTitle>
                <ItemDescription>{`${data} is loading...`}</ItemDescription>
            </ItemContent>
        </Item>
    )
}