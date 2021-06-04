import http from 'http';
import express from 'express';
import cors from 'cors'
import {apiRouter} from './api';
import config from './config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/', apiRouter);

const server = http.createServer(app);

const SERVERHOST = config.serverHost;
const SERVERPORT = config.serverPort;

server.listen(SERVERPORT, SERVERHOST, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Mock server is listening http://${SERVERHOST}:${SERVERPORT}`);
    } 
});
