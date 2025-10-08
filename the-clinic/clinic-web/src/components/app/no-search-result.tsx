import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

export default function NoSearchResult({data} : {data: string}) {
    return (
        <Card>
            <CardContent>
                <CardTitle>No Search Result</CardTitle>
                <CardDescription>{`There is no search result for ${data}.`}</CardDescription>
            </CardContent>
        </Card>
    )
}