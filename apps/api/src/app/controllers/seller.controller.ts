import { ISeller, SellerService } from '@aba-workspace/api-services';
import * as express from 'express';

const sellerRouter = express.Router();
sellerRouter.get('/seller', async (req, res) => {
  const sellers = await SellerService.query(req.query);
  res.send(sellers);
});

sellerRouter.get('/seller/search/:name', async (req, res) => {
  const sellers = await SellerService.searchByName(req.params.name);
  res.send(sellers);
});

sellerRouter.get('/seller/:id', async (req, res) => {
  const seller = await SellerService.findOne(req.params.id);
  res.send(seller);
});

sellerRouter.post('/seller', async (req, res) => {
  const seller = await SellerService.create(req.body as ISeller);
  res.send(seller);
});

sellerRouter.put('/seller/:id', async (req, res) => {
  const seller = await SellerService.update(req.params.id, req.body as ISeller);
  res.send(seller);
});

sellerRouter.delete('/seller/:id', async (req, res) => {
  const seller = await SellerService.remove(req.params.id);
  res.send(seller);
});

export default sellerRouter;
