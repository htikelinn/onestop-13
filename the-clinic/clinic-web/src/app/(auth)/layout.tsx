import { Button } from "@/components/ui/button"
import type { LayoutProps } from "@/lib"
import { ArrowLeft, HeartPlus } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"

export default function AuthLayout({children} : LayoutProps) {
    return (
        <div className="h-screen flex">
            <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src="/heros/cover-2.jpg" alt="" className="w-full h-full object-cover" width={500} height={500} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                </div>
                <div className="flex flex-col relative z-10 h-screen justify-center items-center">
                    <HeartPlus size={160} className="text-blue-100" />
                    <h1 className="text-4xl text-blue-50 font-bold">THE CLINIC</h1>
                    <p className="text-xl w-1/2 text-center text-white my-4">We appreciate you choosing us for your care today.</p>

                    <Button asChild variant={"secondary"}>
                        <Link href="/">
                            <ArrowLeft /> Go Back Home
                        </Link>
                    </Button>
                </div>
            </div>
            <main className="flex-1 flex items-center justify-center">
                <section className="w-2/3">
                    {children}
                </section>
            </main>
        </div>
    )
}