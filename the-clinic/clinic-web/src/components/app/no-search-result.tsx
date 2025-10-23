export default function NoSearchResult({data} : {data: string}) {
    return (
        <div className="border p-4 rounded-lg">
            <h1>No Data</h1>
            <p className="text-muted-foreground">{`There is no ${data}.`}</p>
        </div>
    )
}