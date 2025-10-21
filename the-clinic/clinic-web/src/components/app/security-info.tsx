import { Table, TableCell, TableHead, TableRow } from "../ui/table";

export default function SecurityInfo({createdAt, createdBy, modifiedAt, modifiedBy} : {createdAt: string, createdBy: string, modifiedAt: string, modifiedBy: string}) {
    return (
        <section>
            <h3 className="text-lg">Security Information</h3>

            <Table className="mt-4">
                <TableRow>
                    <TableHead>Created By</TableHead>
                    <TableCell>{createdBy}</TableCell>
                    <TableHead>Modified By</TableHead>
                    <TableCell>{modifiedBy}</TableCell>
                </TableRow>
                <TableRow>
                    <TableHead>Created At</TableHead>
                    <TableCell>{createdAt}</TableCell>
                    <TableHead>Modified At</TableHead>
                    <TableCell>{modifiedAt}</TableCell>
                </TableRow>
            </Table>

        </section>
    )
}
