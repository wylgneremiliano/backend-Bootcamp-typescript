import { Router, response } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
import AppointmentRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// SoC: Separation of Concerns (Separação de preocupações)
// DTO - Date Tranfer Object

appointmentsRouter.get("/", async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointment = await appointmentRepository.find();
  return response.json(appointment);
});
appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return response.json(appointment);
});
export default appointmentsRouter;
