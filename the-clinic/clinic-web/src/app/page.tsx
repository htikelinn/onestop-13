import PublicHero from "@/components/app/public-hero";
import { Button } from "@/components/ui/button";
import { DepartmentForHome, DoctorForHome } from "@/lib/model/public-home.model";
import { getDepartmentsForHome, getDoctorsForHome } from "@/lib/service/public-home-service";
import { DoorOpen, HeartPlus } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from 'lucide-react'
import { Card } from "@/components/ui/card";


export default async function PublicHome() {

  const departments = await getDepartmentsForHome()
  const doctors = await getDoctorsForHome()

  return (
    <>
      <PublicHeader departments={departments.length > 1} doctors={doctors.length > 1} />
      <PublicHero />

      {departments.length > 1 &&
        <PublicDepartment items={departments} />
      }

      {doctors.length > 1 && 
        <PublicDoctors items={doctors} />
      }

      <PublicContact />

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

function PublicDepartment({items} : {items : DepartmentForHome[]}) {
    return (
        <section id="departments" className="min-h-screen flex flex-col items-center pt-26 gap-6">
            <h1 className="text-3xl">Our Departments</h1>
            <p className="w-1/2 text-center text-gray-500">We offer a wide range of specialized medical services with experienced professionals and cutting-edge technology to ensure the best care for our patients.</p>

            <section className="w-2/3 grid grid-cols-3 gap-4">
            {items.map((item) => 
                <DepartmentItem key={item.id} dept={item} />
            )}
            </section>

        </section>
    )
}

function DepartmentItem({dept} : {dept : DepartmentForHome}) {

    const Icon = LucideIcons[dept.icon] as LucideIcons.LucideIcon

    return (
        <Card className="p-6 hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-2">
            <Icon />
            <span className="font-semibold">{dept.name}</span>
            <p className="text-center">{dept.description}</p>
        </Card>
    )
}

function PublicDoctors({items} : {items: DoctorForHome[]}) {
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

function DoctorItem({item} : {item : DoctorForHome}) {
  return (
    <Card className="p-6 hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-2">
      <span className="text-xl">{item.title}. {item.name}</span>
      <span className="text-center">{item.degree}</span>
    </Card>
  )
}

function PublicContact() {
    return (
        <section id="contact" className="min-h-screen flex flex-col items-center pt-26 pb-16 gap-6">
          <h1 className="text-3xl">Contact Us</h1>
          <p className="w-1/2 text-center text-gray-500">{"Find us at our conveniently located facility. We're here to serve you with the best healthcare services."}</p>

          <div className="h-full w-full flex gap-4 px-25">
            <article className="flex-1">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.88780763718!2d96.12409471092785!3d16.831920983896772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c194c84ae48349%3A0xdb8720a8151c06c7!2sJava%20Developer%20Class%20(JDC)!5e0!3m2!1sen!2smm!4v1759601870155!5m2!1sen!2smm" width="100%" height="450" style={{border: 0}} allowFullScreen={true} loading="lazy" ></iframe>
            </article>

            <div className="flex-1 space-y-4">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LucideIcons.MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      120B Yadanar Myaing Street<br />
                      Kamayut 1 Quarter, Kamayut Township, Yangon.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LucideIcons.Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="mb-2">Phone</h3>
                    <p className="text-muted-foreground">
                      Main: +1 (555) 123-4567<br />
                      Emergency: +1 (555) 911-0000
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LucideIcons.Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      General: info@medicareclinic.com<br />
                      Appointments: appointments@medicareclinic.com<br />
                      Support: support@medicareclinic.com
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LucideIcons.Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="mb-2">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 9:00 AM - 5:00 PM<br />
                      Sunday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </section>
    )
}

function PublicFooter({departments} : {departments : DepartmentForHome[]}) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="px-16 py-8 space-y-6">
        <div className="grid grid-cols-3">
          <article className="space-y-4">
            <h1 className="flex items-center gap-2">
              <HeartPlus /> 
              <span className="text-xl">THE CLINIC</span>
            </h1>

            <p className="text-primary-foreground/80">Providing exceptional healthcare services with compassion and excellence since 2000.</p>

            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <LucideIcons.Facebook />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <LucideIcons.Twitter />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <LucideIcons.Instagram />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <LucideIcons.Linkedin />
              </a>
            </div>
          </article>

          {departments.length > 1 &&
            <article className="space-y-4">
              <h1 className="flex items-center gap-2">
                <LucideIcons.Network />
                <span className="text-xl">DEPARTMENTS</span>
              </h1>

              <div>
                {departments.map((item) => 
                  <div key={item.id}>{item.name} Department</div>
                )}
              </div>
            </article>
          }

          <article className="space-y-4">
            <h1 className="flex items-center gap-2">
              <LucideIcons.MapPin />
              <span className="text-xl">CONTACTS</span>
            </h1>
            <p className="text-primary-foreground/80">
              120B Yadanar Myaing Street<br />
              Kamayut 1 Quarter, Kamayut Township, Yangon.
            </p>
            <p className="text-primary-foreground/80">
              Main: +1 (555) 123-4567<br />
              Emergency: +1 (555) 911-0000
            </p>
          </article>
        </div>
        
        <div className="text-center text-primary-foreground/80">
          <span>© 2025 The Clinic. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}