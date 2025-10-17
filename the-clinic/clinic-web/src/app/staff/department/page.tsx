import PageTitle from "@/components/app/page-title";
import { Network } from "lucide-react";

export default function DepartmentList() {
    return (
        <>
            <PageTitle icon={<Network className="size-4" />} name="Department Management" />
        </>
    )
}