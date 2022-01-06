import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { UserService } from '@aba-workspace/api-services';
import { connect } from 'mongoose';
import router from './app/app.route';

const app = express();
connect('mongodb://root:example@localhost:27017/');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
