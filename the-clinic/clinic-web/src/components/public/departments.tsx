import { DepartmentListItem } from "@/lib/model/department.model";
import DepartmentItem from "./department-item";

export default function PublicDepartments({items} : {items : DepartmentListItem []}) {
    return (
        <section id="departments" className="min-h-screen flex flex-col items-center pt-26 gap-6">
            <h1 className="text-3xl">Our Departments</h1>
            <p className="w-1/2 text-center text-gray-500">We offer a wide range of specialized medical services with experienced professionals and cutting-edge technology to ensure the best care for our patients.</p>

            <section className="w-2/3 grid grid-cols-3 gap-4">
            {items.map((item) => 
                <DepartmentItem key={item.id} dept={item} />
            )}
            </section>

        </section>
    )
}
