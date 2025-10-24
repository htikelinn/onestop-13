import PublicDepartments from '@/components/public/departments'
import * as publicClient from '@/lib/model/public-home.service'

export default async function PublicDepartmentsPage() {

    const departments = await publicClient.getDepartmentsForHome()

    return (
        <PublicDepartments items={departments} />
    )
}