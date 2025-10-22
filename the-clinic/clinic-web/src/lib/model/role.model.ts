import z from "zod";
import { DetailsBase, ListBase } from "..";

export const RoleSchema = z.object({
    name: z.string().nonempty("Please enter role name."),
    description: z.string().nonempty("Please enter description of role."),
    permissions: z.array(z.object({
        path: z.string().nonempty("Please select feature."),
        permission: z.string().optional()
    }))
})

export type RoleForm = z.infer<typeof RoleSchema>

export type RoleSearch = {
    deleted?: string
    keyword?: string
}

export type RoleListItem = {
    id: number
    name: string
    description: string
} & ListBase

export type RoleDetails = {
    id: number
    name: string
    description: string
    permissions: Permission[]
} & DetailsBase

export type Permission = {
    path: string
    permission?: string
}