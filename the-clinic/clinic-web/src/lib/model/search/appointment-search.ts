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