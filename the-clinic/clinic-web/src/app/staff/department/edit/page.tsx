import DepartmentEditView from "@/components/app/edit-department"
import PageTitle from "@/components/app/page-title"

export default async function EditDepartment() {

    return (
        <section className="space-y-6">
            <PageTitle icon="Pencil" name="Edit Department" />
            <DepartmentEditView />
        </section>
    ) 
}