import * as LucideIcons from 'lucide-react'

export type DepartmentForHome = {
    id: number
    icon: keyof typeof LucideIcons
    name: string
    description: string
}

export type DoctorForHome = {
    id: number
    name: string
    degree: string
    title: string
}