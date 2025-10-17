import { getDoctorsForHome } from "@/lib/model/public-home.service"
import AppointmentEditForm from "../_lib/edit-form"
import { CalendarCheck } from "lucide-react"

export default async function CreateAppointment() {

    const doctors = await getDoctorsForHome()

    return (
        <div>
            <h1 className="flex gap-2 items-center text-2xl mb-4"><CalendarCheck className="size-6" /> Take Appointment</h1>
            <AppointmentEditForm doctors={doctors} />
        </div>
    )
}