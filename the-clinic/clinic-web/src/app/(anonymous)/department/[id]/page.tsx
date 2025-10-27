import * as publicClient from '@/lib/model/public-home.service'
import { LucideIconType } from '@/lib/model/auth.model'
import PublicDetailsHeader from '@/components/public/public-details-header'
import DoctorItem from '@/components/public/doctor-item'

export default async function DepartmentDetailsPage(props : PageProps<'/department/[id]'>) {

    const { id } = await props.params
    const details = await publicClient.getDepartmentDetails(id)

    return (
        <div className='space-y-6'>
            <PublicDetailsHeader icon={details.icon as LucideIconType || 'Network'} 
                title={details.name} subTitle={details.description} />

            <div className='flex justify-center'>
                {details.doctors.length > 0 && 
                <div className='w-5/6 flex flex-col items-center'>
                    <h3 className='text-xl mb-4'>Doctors</h3>

                    <div className='grid grid-cols-3 gap-4'>
                        {details.doctors.map((doctor, index) => 
                            <DoctorItem item={doctor} key={index} />
                        )}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}