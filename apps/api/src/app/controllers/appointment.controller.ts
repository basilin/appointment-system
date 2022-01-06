import * as express from 'express';
import { IAppointment, AppointmentService } from '@aba-workspace/api-services';

const appointmentRouter = express.Router();
appointmentRouter.get('/user',async (req,res)=>{
  const users = await AppointmentService.query({});
  res.send(users)
});

appointmentRouter.post('/user',async (req,res)=>{
  const user = await AppointmentService.create(req.body as IAppointment);
  res.send(user)
});

export default appointmentRouter;
