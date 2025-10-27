import PageTitle from "@/components/app/page-title";
import CreateAppointmentForAnonymousUser from "@/components/public/public-edit-appointment";

export default function CreateAppointmentPage() {
    return (
        <section className="space-y-6">
            <PageTitle icon="CalendarCheck" name="Take Appointment" />

            <CreateAppointmentForAnonymousUser />
        </section>
    )
}