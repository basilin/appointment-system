import * as express from 'express';
import { IUser, UserService } from '@aba-workspace/api-services';

const userRouter = express.Router();
userRouter.get('/user',async (req,res)=>{
  const users = await UserService.query({});
  res.send(users)
});

userRouter.post('/user',async (req,res)=>{
  const user = await UserService.create(req.body as IUser);
  res.send(user)
});

export default userRouter;
