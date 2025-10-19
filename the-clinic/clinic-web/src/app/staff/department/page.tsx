import DepartmentSearchView from "@/components/app/department-search-vew";
import { DepartmentListItem, DepartmentSearch } from "@/lib/model/department.model";
import { ArrowRight, Check, Link, Table } from "lucide-react";
import * as departmentClient from '@/lib/model/department.service'
import NoSearchResult from "@/components/app/no-search-result";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function DepartmentList(params : PageProps<'/staff/department'>) {

    const queryParams = await params.searchParams

    const searchForm:DepartmentSearch = {
        deleted: queryParams['deleted'] as string | undefined,
        keyword: queryParams['keyword'] as string | undefined
    }

    const list = await departmentClient.search(searchForm)

    return (
        <section className="space-y-4">
            <DepartmentSearchView search={searchForm} />
            <DepartmentListView list={list} />
        </section>
    )
}

function DepartmentListView({list} : {list: DepartmentListItem[]}) {
    return (
        <>
            {list.length == 0 && 
                <NoSearchResult data="Department" />
            }

            {list.length > 0 && 
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Doctors</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {list.map((item, index) => 
                        <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.doctors}</TableCell>
                            <TableCell>{item.deleted ? "" : <Check className="size-4" />}</TableCell>
                            <TableCell>{item.createdAt}</TableCell>
                            <TableCell>
                                <Link href={`/staff/department/${item.id}`}>
                                    <ArrowRight />
                                </Link>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            }
        </>
    )
}