const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
const app = express();

const TOKEN = 'министерство_не_ваших_собачих_дел';
const PORT = parseInt(process.env.PORT, 10) || 9000;

const options = {
  host: 'jsonplaceholder.typicode.com',
  port: 80,
  path: '/posts/1',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
const sendMessage = data => {
  console.log('============data=====================');
  console.log(data);
  console.log('====================================');

  const port = options.port === 443 ? https : http;
  const req = port.request(options, res => {
    console.log('============response===============');
    console.log(`${options.host} : ${res.statusCode}`);
    console.log('==============END==================');
  });

  req.on('error', error => {
    console.log('=========REQUEST ERROR=============');
    console.log(error);
    console.log('=============END===================');
  });

  req.end();
};

const testController = (req, res) => {
  const { body } = req;

  const payload = {
    status: 'ok',
    payload: [
      {
        sended: moment().toISOString(),
        body
      }
    ]
  };

  sendMessage(body);
  return res.status(200).send(payload);
};

router.post('/send-message', testController);

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.listen(PORT, () => console.log('HTTP server listening on port %s', PORT));
