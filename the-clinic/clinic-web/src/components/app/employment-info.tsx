import Information from "./information";

export default function EmploymentInfo({assignAt, retiredAt} : {assignAt: string, retiredAt?: string}) {
    return (
        <section className="space-y-4">
            <h3 className="text-xl">Employment Information</h3>
            <div className="grid grid-cols-3 gap-4">
                <Information icon="CalendarCheck" title="Assign At" value={assignAt} />
                <Information icon="CalendarX" title="Retired At" value={retiredAt || "Not Now"} />
            </div>
        </section>
    )
}