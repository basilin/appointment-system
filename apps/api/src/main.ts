import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { connect } from 'mongoose';
import router from './app/app.route';

const app = express();
connect('mongodb://root:example@localhost:27017/',{
  dbName: 'booking'
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
