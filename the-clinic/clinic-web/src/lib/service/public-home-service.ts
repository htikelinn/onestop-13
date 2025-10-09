'use server'

import { addDays } from "date-fns";
import { DepartmentForHome, DoctorForHome, DoctorSchedule } from "../model/public-home.model";

export async function getDepartmentsForHome():Promise<DepartmentForHome[]> {
    return [
        {
            id: 1,
            icon: 'Stethoscope',
            name: "General Medicine",
            description: "Comprehensive primary healthcare"
        },
        {
            id: 2,
            icon: 'Heart',
            name: "Cardiology",
            description: "Heart and cardiovascular system care"
        },
        {
            id: 3,
            icon: 'Brain',
            name: "Neurology",
            description: "Brain and nervous system treatment"
        },
        {
            id: 4,
            icon: 'Baby',
            name: "Pediatrics",
            description: "Specialized care for children"
        },
        {
            id: 5,
            icon: 'Bone',
            name: "Orthopedics",
            description: "Bone and joint specialists"
        },
        {
            id: 6,
            icon: 'Microscope',
            name: "Laboratory",
            description: "Advanced diagnostic testing"
        },

    ]
}

export async function getDoctorsForHome():Promise<DoctorForHome[]> {
    return [
        {
            id: "1",
            name: "Nyi Nyi",
            title: "Prof",
            degree: "M.B.,B.S, M.Med.Sc[Int.Med] , M.R.C.P [UK], F.R.C.P [Edin], Professor/Consultant Physician"
        },
        {
            id: "2",
            name: "Aung Set",
            title: "Prof",
            degree: "M.B.,B.S, M.Med.Sc (Int.Med), M.R.C.P(UK), Dr.Med.Sc(Gen.Med)"
        },
        {
            id: "3",
            name: "Thidar Nwe",
            title: "Dr",
            degree: "M.B.,B.S, M.Med.Sc (Int.Med), M.R.C.P"
        },
        {
            id: "4",
            name: "Myo Ma Ma",
            title: "Dr",
            degree: "M.B.,B.S, M.Med.Sc(Internal Medicine), Dr.Med.Sc(General Medicine), MRCP(UK), FRCP(Edin), FRCP(London)"
        },
    ]
}

export async function findScheduleForDoctor(id: string):Promise<DoctorSchedule[]> {
    console.log(id)
    return [
        {
            scheduleDate: new Date,
            startTime: "9:00am",
            endTime: "12:00am"
        },
        {
            scheduleDate: addDays(new Date, 1),
            startTime: "4:00pm",
            endTime: "08:00pm"
        },
        {
            scheduleDate: addDays(new Date, 2),
            startTime: "9:00am",
            endTime: "12:00am"
        },
        {
            scheduleDate: addDays(new Date, 3),
            startTime: "4:00pm",
            endTime: "08:00pm"
        },
        {
            scheduleDate: addDays(new Date, 4),
            startTime: "9:00am",
            endTime: "12:00am"
        },

    ]
}