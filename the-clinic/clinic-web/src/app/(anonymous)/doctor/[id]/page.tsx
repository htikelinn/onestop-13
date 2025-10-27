import PublicDetailsHeader from '@/components/public/public-details-header'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PublicSchedule } from '@/lib/model/doctor.model'
import * as publicClient from '@/lib/model/public-home.service'
import { parseDate } from '@/lib/utils'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DoctorDetailsPage(props : PageProps<'/doctor/[id]'>) {

    const { id } = await props.params
    const details = await publicClient.getDoctorDetails(id)

    function getQueryPrams(schedule: PublicSchedule) {
        const params = new URLSearchParams
        params.append("doctorId", id)
        params.append("scheduleDate", schedule.date)
        params.append("scheduleTime", schedule.scheduleTime)
        return params.toString()
    }

    return (
        <div className='space-y-8'>

            <PublicDetailsHeader icon='Stethoscope' title={`${details.title} ${details.name}`}
                subTitle={`${details.degree}, ${details.department}`} />

            
            <div className='flex justify-center'>
                <section className='w-2/3'>
                    <h3 className='text-center'>Schedules</h3>

                    <Table className='mt-4'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Day</TableHead>
                                <TableHead>Times</TableHead>
                                <TableHead>Tokens</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                        {details.schedules.map((item, index) => 
                            <TableRow key={index}>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{format(parseDate(item.date)!, "EEE")}</TableCell>
                                <TableCell>{item.scheduleTime}</TableCell>
                                <TableCell>{item.tokens}</TableCell>
                                <TableCell className='text-end'>
                                    <Button type='button' asChild variant={'outline'}>
                                        <Link href={`/appointment?${getQueryPrams(item)}`}>
                                            Appointmet 
                                            <ArrowRight />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </section>
            </div>
            
        </div>
    )
}