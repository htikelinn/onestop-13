import z from "zod";
import { DetailsBase, ListBase } from "..";

export const DoctorSchema = z.object({
    name: z.string().nonempty("Please enter doctor name."),
    email: z.string().nonempty("Please enter email address."),
    phone: z.string().nonempty("Please enter phone number."),
    roleId: z.number().nonoptional("Please select role"),
    assignAt: z.date().nonoptional("Please select assign date."),
    departmentId: z.number().nonoptional("Please select department."),
    title: z.string().nonempty("Please enter title."),
    degree: z.string().nonempty("Please enter degree."),
    schedules: z.array(z.object({
        day: z.string().nonempty("Please select Day."),
        start: z.string().nonempty("Please enter start time."),
        end: z.string().nonempty("Please enter end time."),
    }))
})

export type DoctorForm = z.infer<typeof DoctorSchema>

export type DoctorSearch = {
    departmentId?: string
    deleted?: string
    keyword?: string
}

export type DoctorListItem = {
    id: number
    name: string
    department: string
    phone: string
    email: string
    title: string
} & ListBase

export type DoctorDetails = {
    id: number
    name: string
    phone: string
    email: string
    title: string
    degree: string
    departmentId: number
    department: string
    roleId: number
    roleName: string
    scuedules: Schedule[]
} & DetailsBase

export type Schedule = {
    day: string
    start: string
    end: string
}