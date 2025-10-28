import DepartmentEditView from "@/components/app/edit-department"
import PageTitle from "@/components/app/page-title"

export default function CreateDepartment() {
    return (
        <section className="space-y-6">
            <PageTitle icon="Plus" name="Create Department" />
            <DepartmentEditView />
        </section>
    )
}