import { Button } from "@/components/ui/button";
import { DepartmentListItem } from "@/lib/model/department.model";
import { DoctorListItem } from "@/lib/model/doctor.model";
import { DoorOpen, HeartPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

import * as publicClient from "@/lib/model/public-home.service"
import PublicFooter from "@/components/public/footer";

export default async function AnonymousLayout({children} : {children : React.ReactNode}) {
    
    const departments = await publicClient.getDepartmentsForHome()
    const doctors = await publicClient.getDoctorsForHome()

    return (
        <div>
            <AnonymousHeader departments={departments} doctors={doctors} />

            <main className="min-h-screen">
                <div className="px-16 py-4">
                    {children}
                </div>
            </main>

            <PublicFooter departments={departments} />
        </div>
    )
}

function AnonymousHeader({departments, doctors} : {departments : DepartmentListItem[], doctors : DoctorListItem[]} ) {
    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                    <HeartPlus />
                    <span className="text-primary text-xl">THE CLINIC</span>
                </a>

                <div>
                    <nav className="hidden md:flex items-center gap-6">
                        {departments && 
                            <a href="/department" className="text-foreground hover:text-primary transition-colors">
                                Departments
                            </a>
                        }

                        {doctors && 
                            <a href="/doctor" className="text-foreground hover:text-primary transition-colors">
                                Doctors
                            </a>
                        }

                        {(departments || doctors) && 
                            <a href="/#contact" className="text-foreground hover:text-primary transition-colors">
                                Contact Us
                            </a>
                        }
                        <Button asChild>
                            <Link href={"/signin"}>
                                <DoorOpen /> Sign In
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}