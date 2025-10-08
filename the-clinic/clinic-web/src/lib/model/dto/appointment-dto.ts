import { AppointmentStatus } from "../search/appointment-search"

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