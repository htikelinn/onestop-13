import Pagination from "@/components/app/pagination"
import SearchForm from "./_lib/search-form"
import * as appointmentApi from "@/lib/model/appointment.service"
import NoSearchResult from "@/components/app/no-search-result"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AppointmentListItem } from "@/lib/model/appointment.model"
import SectionTitle from "@/components/app/section-title"

export default async function Appointments(props : PageProps<'/patient/appointments'>) {
    
    const params = await props.searchParams
    const {list, pageInfo} = await appointmentApi.search(params)

    return (
        <section className="space-y-4">
            <SectionTitle title="Appointment Management" icon="CalendarCheck" />

            <SearchForm params={params} />

            {list.length ? 
                <ResultView list={list} /> : 
                <NoSearchResult data="Appointment" />
            }

            {pageInfo.links.length > 1 && 
                <Pagination info={pageInfo} />
            }
        </section>
    )
}

function ResultView({list} : {list : AppointmentListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Token No.</TableHead>
                    <TableHead>Appoint At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {list.map(item => 
                <TableRow key={item.id}>
                    <TableCell>{item.scheduleDate}</TableCell>
                    <TableCell>{item.scheduleTime}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.doctor}</TableCell>
                    <TableCell>{item.tokenNo}</TableCell>
                    <TableCell>{item.appointAt}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                        <Link href={`/patient/appointments/${item.id}`}>
                            <ArrowRight className="size-4" />
                        </Link>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}