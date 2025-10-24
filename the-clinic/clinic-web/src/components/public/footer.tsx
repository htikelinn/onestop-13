import { DepartmentListItem } from "@/lib/model/department.model";
import { Facebook, HeartPlus, Instagram, Linkedin, MapPin, Network, Twitter } from "lucide-react";

export default function PublicFooter({departments} : {departments : DepartmentListItem[]}) {
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
                <Facebook />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Instagram />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin />
              </a>
            </div>
          </article>

          {departments.length > 1 &&
            <article className="space-y-4">
              <h1 className="flex items-center gap-2">
                <Network />
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
              <MapPin />
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