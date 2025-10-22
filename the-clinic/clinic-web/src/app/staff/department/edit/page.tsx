import DepartmentEditView from "@/components/app/edit-department"

export default async function EditDepartment(props : PageProps<'/staff/department/edit'>) {

    const { id } = await props.searchParams
    const departmentId = id as string | undefined
    
    return (
        <DepartmentEditView id={departmentId} />
    ) 
}