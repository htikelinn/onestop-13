import { format } from "date-fns";
import { AppointmentListItem } from "../model/dto/appointment-dto";
import { DUMMY_PAGE, PageResult } from "../model/dto/common-dto";

export async function searchAppointment(form: {[key:string] : string | undefined}):Promise<PageResult<AppointmentListItem>> {
    console.log(form)
    return {
        list: [
            {
                id: "1001",
                scheduleDate: format(Date.now(), "yyyy-MM-dd"),
                status: "Applied",
                appointAt: format(Date.now(), "yyyy-MM-dd HH:mm"),
                department: "GP",
                doctor: "U Ko Ko",
                patient: "Thidar Aung",
                phone: "09881717161",
                scheduleTime: "10:00 am",
                tokenNo: 10
            }
        ],
        pageInfo: DUMMY_PAGE
    }
}