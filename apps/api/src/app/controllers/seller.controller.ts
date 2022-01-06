import { ISeller, SellerService } from '@aba-workspace/api-services';
import * as express from 'express';


const sellerRouter = express.Router();
sellerRouter.get('/seller',async (req,res)=>{
  const users = await SellerService.query({});
  res.send(users)
});

sellerRouter.post('/seller',async (req,res)=>{
  const user = await SellerService.create(req.body as ISeller);
  res.send(user)
});

export default sellerRouter;
