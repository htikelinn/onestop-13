import { DepartmentListItem } from "@/lib/model/department.model";
import IconComponent from "../app/icon-component";
import { Button } from "../ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

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

function DepartmentItem({dept} : {dept : DepartmentListItem}) {

    return (
        <div className="p-4 hover:shadow-md flex flex-col items-center justify-center gap-2 border rounded-lg">
            <IconComponent name={dept.icon} />
            <span className="font-semibold">{dept.name}</span>
            <p className="text-center line-clamp-4">{dept.description}</p>

            <div className="pt-4 w-full">
                <Button type="button" asChild className="w-full"> 
                    <Link href={`/department/${dept.id}`}>
                        <BookOpen /> Show Details
                    </Link>
                </Button>                
            </div>
        </div>
    )
}
