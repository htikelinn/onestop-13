import z from "zod"

export const PublicAppointmentSchema = z.object({
    scheduleDate : z.string().nonempty("Please select schedule date."),
    scheduleTime : z.string().nonempty("Please select schedule time."),
    doctorId: z.string().nonempty("Please select doctor."),
    patientName: z.string().nonempty("Please patient name."),
    dateOfBirth: z.string().nonempty("Please enter date of birth."),
    phone: z.string().nonempty("please enter phone number."),
    chiefComplaint: z.string().nonempty("Please enter reason for visit."),
})

export type PublicAppointmentForm = z.infer<typeof PublicAppointmentSchema>

export const AppointmentCancelSchema = z.object({
    reason: z.string().nonempty("Please enter reason for cancel.")
})

export type AppointmentCancelForm = z.infer<typeof AppointmentCancelSchema>

export type AppointmentSearch = {
    doctorId?: string
    status?: string
    from?: string
    to?: string
    keyword? : string
} & {
    page?: string
    size?: string
}

export type AppointmentListItem = {
    code: string
    scheduleDate: string
    scheduleTime: string
    tokenNumber: number
    department: string
    doctor: string
    patient: string
    phone: string
    status: string
    appointAt: string
}

export type AppointmentDetails = {
    dob:string
    chiefComplain : string
    remark : string
    deleted: boolean
    createdBy: string
    updatedAt: string
    updatedBy: string
} & AppointmentListItem
