import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'
import appointmentsRouter from '../routes/appointments.routes'
import { startOfHour } from 'date-fns'
interface Request {
    provider: string
    date: Date
}

// Dependency Inversion (SOLID)

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository
    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository
    }
    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppontmentInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        )
        if (findAppontmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate
        })
        return appointment
    }
}

export default CreateAppointmentService