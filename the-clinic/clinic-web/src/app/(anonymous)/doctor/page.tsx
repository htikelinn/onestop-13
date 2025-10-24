import PublicDoctors from '@/components/public/doctors'
import * as publicClient from '@/lib/model/public-home.service'

export default async function PublicDoctorsPage() {

    const doctors = await publicClient.getDoctorsForHome()

    return (
        <PublicDoctors items={doctors} />
    )
}