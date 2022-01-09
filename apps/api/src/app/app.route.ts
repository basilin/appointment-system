import * as express from 'express';
import appointmentRouter from './controllers/appointment.controller';
import sellerRouter from './controllers/seller.controller';
import slotRouter from './controllers/slot.controller';
import userRouter from './controllers/user.controller';

const router = express.Router();
router.use(userRouter);
router.use(sellerRouter);
router.use(appointmentRouter);
router.use(slotRouter);

export default router;
