import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "../ui/card";

export default function ContactUs() {
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
                    <MapPin className="w-6 h-6 text-blue-600" />
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
                    <Phone className="w-6 h-6 text-green-600" />
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
                    <Mail className="w-6 h-6 text-purple-600" />
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
                    <Clock className="w-6 h-6 text-orange-600" />
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