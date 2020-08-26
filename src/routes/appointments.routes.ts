import { Router, response } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentRepository'
import Appointment from '../models/Appointment'
import CreateAppointmentService from '../services/CreateAppointmentService'
const appointmentsRouter = Router()
const appointmentRepository = new AppointmentRepository()

// SoC: Separation of Concerns (Separação de preocupações)
// DTO - Date Tranfer Object 

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentRepository.all()
  return response.json(appointment)
})
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body
    const parsedDate = parseISO(date)
    const createAppointment = new CreateAppointmentService(
      appointmentRepository
    )
    const appointment = createAppointment.execute({ provider, date: parsedDate })
    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({error: error.message})
  }
})
export default appointmentsRouter