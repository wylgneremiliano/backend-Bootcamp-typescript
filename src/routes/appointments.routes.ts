import { Router, response } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

// SoC: Separation of Concerns (Separação de preocupações)
// DTO - Date Tranfer Object 

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  const appointment = await appointmentRepository.find()
  return response.json(appointment)
})
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body
    const parsedDate = parseISO(date)
    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate
    })
    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})
export default appointmentsRouter