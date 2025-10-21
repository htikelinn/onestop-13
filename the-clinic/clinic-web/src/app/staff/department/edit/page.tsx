import DepartmentEditView from "@/components/app/department-edit-view"

export default async function EditDepartment(props : PageProps<'/staff/department/edit'>) {

    const { id } = await props.searchParams
    const departmentId = id as string | undefined
    
    return (
        <DepartmentEditView id={departmentId} />
    ) 
}