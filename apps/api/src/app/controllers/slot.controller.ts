import * as express from 'express';
import { ISlot, SlotService } from '@aba-workspace/api-services';

const slotRouter = express.Router();
slotRouter.get('/slot', async (req, res) => {
  const slots = await SlotService.query(req.query);
  res.send(slots);
});

slotRouter.get('/appointment-slot', async (req, res) => {
  const sellerId = req.query?.sellerId?.toString();
  const date = req.query?.date?.toString();
  if(!sellerId) return res.status(400).send({message:'sellerId Required'});
  if(!date) return res.status(400).send({message:'date Required'});
  const slots = await SlotService.appointmentSlots(sellerId, date);
  res.send(slots);
});

slotRouter.post('/slot', async (req, res) => {
  const slot = await SlotService.create(req.body as ISlot);
  res.send(slot);
});

slotRouter.delete('/slot/:id', async (req, res) => {
  const slot = await SlotService.remove(req.params.id);
  res.send(slot);
});

export default slotRouter;
