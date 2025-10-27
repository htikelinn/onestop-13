import { DoctorListItem } from "@/lib/model/doctor.model";
import { Button } from "../ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function DoctorItem({item} : {item : DoctorListItem}) {
  return (
    <div className="p-6 border rounded-lg hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-2">
        <span className="text-xl">{item.title} {item.name}</span>
        <span className="text-center">{item.department} - {item.degree}</span>

        <Button asChild type="button">
            <Link href={`/doctor/${item.id}`}>
                <BookOpen /> Show Details
            </Link>
        </Button>
    </div>
  )
}
