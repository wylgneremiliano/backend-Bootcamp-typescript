import Appointment from '../entities/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppError from '../../../shared/errors/AppError'
interface Request {
	provider_id: string
	date: Date
}

// Dependency Inversion (SOLID)

class CreateAppointmentService {

	public async execute({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentRepository)
		const appointmentDate = startOfHour(date)

		const findAppontmentInSameDate = await appointmentsRepository.findByDate(
			appointmentDate,
		)
		if (findAppontmentInSameDate) {
			throw new AppError('This appointment is already booked', 400)
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate
		})
		await appointmentsRepository.save(appointment)
		return appointment
	}
}

export default CreateAppointmentService