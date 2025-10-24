import z from "zod"
import { DoctorListItem } from "./doctor.model"
import { DetailsBase, ListBase } from ".."
import { LucideIconType } from "./auth.model"

export const DepartmentSchema = z.object({
    name: z.string().nonempty("Please enter department name."),
    phone: z.string().nonempty("Please enter phone number for department."),
    icon: z.string().nonempty("Please select icon."),
    description: z.string()
})

export type DepartmentForm = z.infer<typeof DepartmentSchema>

export type DepartmentSearch = {
    deleted?: string
    keyword?: string
}

export type DepartmentListItem = {
    id: number
    name: string
    description: string
    icon : LucideIconType
    phone: string
    doctors: number
} & ListBase

export type DepartmentDetails = {
    id: number
    name: string
    icon? : string
    phone: string
    description: string
    doctors: DoctorListItem[]
} & DetailsBase