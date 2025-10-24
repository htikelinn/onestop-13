import { DoctorListItem } from "@/lib/model/doctor.model"
import { Button } from "../ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function PublicDoctors({items} : {items: DoctorListItem[]}) {
  return (
      <section id="doctors" className="min-h-screen flex flex-col items-center pt-26 gap-6">
        <h1 className="text-3xl">Our Doctors</h1>
        <p className="w-1/2 text-center text-gray-500">We offer a wide range of specialized medical services with experienced professionals and cutting-edge technology to ensure the best care for our patients.</p>

        <section className="w-2/3 grid grid-cols-2 gap-4">
          {items.map((item) => 
                <DoctorItem item={item} key={item.id} />
          )}
        </section>          
      </section>
  )
}

function DoctorItem({item} : {item : DoctorListItem}) {
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
