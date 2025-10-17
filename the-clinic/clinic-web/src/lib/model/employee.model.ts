import z from "zod";

export const EmployeeSchema = z.object({})

export type EmployeeForm = z.infer<typeof EmployeeSchema>

export type EmployeeSearch = {

}

export type EmployeeListItem = {

}

export type EmployeeDetails = {
    
}