'use client'

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export default function PublicHero() {

    const [current, setCurrent] = useState(0)

    const greetings = [
        {
            image: "/heros/cover-1.jpg", 
            title: "Your Health is Our Priority.",
            message: "Compassionate care and expert medical guidance are just a click away. Book appointments, view test results, and manage your health journey—all in one secure place."
        },
        {
            image: "/heros/cover-2.jpg", 
            title: "Connected Care. Healthier You.",
            message: "Seamlessly manage your well-being with our easy-to-use patient portal. Access your medical records 24/7, message your care team, and get the information you need, when you need it."
        },
        {
            image: "/heros/cover-3.jpg", 
            title: "Welcome Back. Ready to Connect?",
            message: "Log in to your personal health dashboard. Everything from prescription refills to virtual visits is streamlined for your convenience. Take control of your healthcare journey today."
        },
        {
            image: "/heros/cover-4.jpg", 
            title: "Expert Care, Simplified Access.",
            message: "We bring world-class medicine closer to home. Use our portal to schedule visits with our specialists, check in for appointments, and stay securely connected to your entire care team."
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [greetings.length]);

    return (
        <section id="hero" className="h-screen relative w-full overflow-hidden bg-gray-700">
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{
                            duration: 1.4,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="absolute inset-0">
                        <Image src={greetings[current].image} alt="Welcome to THE CLINIC" 
                            className="w-full h-full object-cover" width={500} height={500} />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 min-h-screen flex items-center">
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-3xl space-y-8">
                        
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white">
                                {greetings[current].title}
                            </h1>
                            <p className="text-lg lg:text-2xl text-white/90 max-w-2xl">
                                {greetings[current].message}
                            </p>                            
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="group bg-white text-black hover:bg-white/90">
                                Appointment
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>                            
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}