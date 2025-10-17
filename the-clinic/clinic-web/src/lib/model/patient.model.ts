import z from "zod";

export const PatientSchema = z.object({})

export type PatientForm = z.infer<typeof PatientSchema>

export type PatientSearch = {

}

export type PatientListItem = {

}

export type PatientDetails = {
    
}