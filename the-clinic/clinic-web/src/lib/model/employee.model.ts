import z from "zod";
import { DetailsBase, ListBase } from "..";

export const EmployeeSchema = z.object({
    name: z.string().nonempty("Please enter doctor name."),
    email: z.string().nonempty("Please enter email address."),
    phone: z.string().nonempty("Please enter phone number."),
    roleId: z.number().nonoptional("Please select role"),
    assignAt: z.date().nonoptional("Please select assign date."),
    retiredAt: z.date().optional()   
})

export type EmployeeForm = z.infer<typeof EmployeeSchema>

export type EmployeeSearch = {
    roleId?: string
    assignFrom?: string
    assignTo?: string
    deleted?: string
    keyword?: string
}

export type EmployeeListItem = {
    id: number
    name: string
    role: string
    phone: string
    email: string
    assignAt: string
    retiredAt: string
} & ListBase

export type EmployeeDetails = {
    id: number
    name: string
    roleId: number
    role: string
    roleDescription: string
    phone: string
    email: string
    assignAt: string
    retiredAt: string
} & DetailsBase