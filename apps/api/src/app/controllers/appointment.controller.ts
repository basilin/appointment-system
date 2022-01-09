import * as express from 'express';
import { IAppointment, AppointmentService } from '@aba-workspace/api-services';

const appointmentRouter = express.Router();
appointmentRouter.get('/appointment', async (req, res) => {
  const appointments = await AppointmentService.query(req.query);
  res.send(appointments);
});

appointmentRouter.post('/appointment', async (req, res) => {
  const appointment = await AppointmentService.create(req.body as IAppointment);
  res.send(appointment);
});

appointmentRouter.put('/appointment/:id', async (req, res) => {
  const appointment = await AppointmentService.update(
    req.params.id,
    req.body as IAppointment
  );
  res.send(appointment);
});

export default appointmentRouter;
