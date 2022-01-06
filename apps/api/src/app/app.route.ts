import * as express from 'express';
import appointmentRouter from './controllers/appointment.controller';
import sellerRouter from './controllers/seller.controller';
import userRouter from './controllers/user.controller';

const router = express.Router();
router.use(userRouter);
router.use(sellerRouter);
router.use(appointmentRouter);

export default router;
