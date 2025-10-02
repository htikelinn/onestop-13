import type { LayoutProps } from "@/lib/utils"
import { HeartPlus } from "lucide-react"

export default function AuthLayout({children} : LayoutProps) {
    return (
        <div className="h-screen flex">
            <div className="flex-1 bg-blue-300 flex flex-col justify-center items-center">
                <HeartPlus size={160} className="text-blue-900" />
                <h1 className="text-4xl text-blue-900 font-bold">THE CLINIC</h1>
                <p className="text-xl w-1/2 text-center text-white mt-4">We appreciate you choosing us for your care today.</p>
            </div>

            <main className="flex-1 flex items-center justify-center">
                <section className="w-2/3">
                    {children}
                </section>
            </main>
        </div>
    )
}