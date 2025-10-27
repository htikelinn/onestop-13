import PublicDetailsHeader from '@/components/public/public-details-header'
import * as publicClient from '@/lib/model/public-home.service'

export default async function DoctorDetailsPage(props : PageProps<'/doctor/[id]'>) {

    const { id } = await props.params
    const details = await publicClient.getDoctorDetails(id)

    return (
        <div className='space-y-8'>

            <PublicDetailsHeader icon='Stethoscope' title={`${details.title} ${details.name}`}
                subTitle={`${details.degree}, ${details.department}`} />

            
            <div className='flex justify-center'>
                <section className='w-2/3 text-center'>
                    <h3>Schedules</h3>
                </section>
            </div>
            
        </div>
    )
}