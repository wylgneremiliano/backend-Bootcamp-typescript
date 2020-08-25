import { Router, response } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'
import Appointment from '../models/Appointment'

const appointmentsRouter = Router()
const appointmentRepository = new AppointmentRepository()

// SoC: Separation of Concerns (Separação de preocupações)
// DTO - Date Tranfer Object 

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentRepository.all()
  return response.json(appointment)
})
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body
  const parsedDate = startOfHour(parseISO(date))
  const findAppontmentInSameDate = appointmentRepository.findByDate(parsedDate)
  if (findAppontmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' })
  }

  const appointment = appointmentRepository.create({
    provider,
    date: parsedDate
  })
  return response.json(appointment)
})
export default appointmentsRouter