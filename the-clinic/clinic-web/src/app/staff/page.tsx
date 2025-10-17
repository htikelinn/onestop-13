import PageTitle from "@/components/app/page-title";
import { LayoutDashboard, ShieldCheck, Stethoscope, UserLock, UserStar } from "lucide-react";

export default function EmployeeHome() {
    return (
        <>
            <PageTitle icon={<LayoutDashboard className="size-4" />} name="Staff Dashboard" />
        </>
    )
}