import { DepartmentListItem } from "@/lib/model/department.model";
import IconComponent from "../app/icon-component";
import { Button } from "../ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function DepartmentItem({dept} : {dept : DepartmentListItem}) {

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
