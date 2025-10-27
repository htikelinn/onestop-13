import z from "zod"

export type AppointmentStatus = "Applied" 
    | "Check In" 
    | "Investigated"
    | "Treatmented"
    | "Check Out"
    | "Canceld"
    | "Expired"

export const AppointmentStatusList = [
    "Applied", "Check In" , "Investigated", "Treatmented", "Check Out", "Canceld", "Expired"
]

export type AppointmentSearch = {
    status?: string
    dateFrom?: string
    dateTo?: string
    keyword? : string
}

export type AppointmentListItem = {
    id: string
    scheduleDate: string
    scheduleTime: string
    tokenNo: number
    department: string
    doctor: string
    patient: string
    phone: string
    status: AppointmentStatus
    appointAt: string
}

export type AppointmentDetails = {
    chiefComplain : string,
    remark : string
    createdBy: string
    updatedAt: string
    updatedBy: string
} & AppointmentListItem


export const AppointmentSchema = z.object({
    scheduleDate : z.date().nonoptional("Please select schedule date."),
    scheduleTime : z.string().nonoptional("Please select schedule time."),
    doctorId: z.string().nonoptional("Please select doctor."),
    chiefComplain: z.string()        
})

export type AppointmentForm = z.infer<typeof AppointmentSchema>

export const PublicAppointmentSchema = z.object({
    scheduleDate : z.string().nonoptional("Please select schedule date."),
    scheduleTime : z.string().nonoptional("Please select schedule time."),
    doctorId: z.string().nonoptional("Please select doctor."),
    patientName: z.string().nonempty("Please patient name."),
    dateOfBirth: z.string().nonoptional("Please enter date of birth."),
    phone: z.string().nonempty("please enter phone number."),
    chiefComplain: z.string(),
})

export type PublicAppointmentForm = z.infer<typeof PublicAppointmentSchema>

export const AppointmentCancelSchema = z.object({
    reason: z.string().nonempty("Please enter reason for cancel.")
})

export type AppointmentCancelForm = z.infer<typeof AppointmentCancelSchema>