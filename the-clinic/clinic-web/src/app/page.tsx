import PublicHero from "@/components/app/public-hero";
import { Button } from "@/components/ui/button";
import { getDepartmentsForHome, getDoctorsForHome } from "@/lib/model/public-home.service";
import { DoorOpen, HeartPlus } from "lucide-react";
import Link from "next/link";
import PublicDepartments from "@/components/public/departments";
import ContactUs from "@/components/public/contact-us";
import PublicFooter from "@/components/public/footer";
import PublicDoctors from "@/components/public/doctors";


export default async function PublicHome() {

  const departments = await getDepartmentsForHome()
  const doctors = await getDoctorsForHome()

  return (
    <>
      <PublicHeader departments={departments.length > 1} doctors={doctors.length > 1} />
      <PublicHero />

      {departments.length > 1 &&
        <PublicDepartments items={departments} />
      }

      {doctors.length > 1 && 
        <PublicDoctors items={doctors} />
      }

      <ContactUs />

      <PublicFooter departments={departments}/>
    </>
  )
}

function PublicHeader({departments, doctors} : {departments : boolean, doctors: boolean}) {
    return (
        <header className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <a href="#hero" className="flex items-center gap-2">
                    <HeartPlus />
                    <span className="text-primary text-xl">THE CLINIC</span>
                </a>

                <div>
                    <nav className="hidden md:flex items-center gap-6">
                        {departments && 
                            <a href="#departments" className="text-foreground hover:text-primary transition-colors">
                                Departments
                            </a>
                        }

                        {doctors && 
                            <a href="#doctors" className="text-foreground hover:text-primary transition-colors">
                                Doctors
                            </a>
                        }

                        {(departments || doctors) && 
                            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
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
