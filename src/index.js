const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const axios = require('axios');
const router = express.Router();
const app = express();

const GIT_LAB_TOKEN = 'министерство_не_ваших_собачих_дел';

const TELEGRAM_HOST = 'api.telegram.org';
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL || '@git_lab_notifier';
const TELEGRAM_TOKEN =
  process.env.TELEGRAM_TOKEN || '628940363:AAFidkqan-HYJpJyvjKpDVcVHtX3OxT6w6s';
const TELEGRAM_URL = `https://${TELEGRAM_HOST}/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHANNEL}&text=`;

// const sendMessage = data => {
//   console.log('============data=====================');
//   console.log(data);
//   console.log('====================================');

//   const message = JSON.stringify(data);

//   const options = {
//     host: TELEGRAM_HOST,
//     port: 443,
//     path: `/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHANNEL}&text=${message}`,
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   const port = options.port === 443 ? https : http;
//   const req = port.request(options, res => {
//     console.log('============response===============');
//     console.log(`${options.host} : ${res.statusCode}`);
//     console.log('==============END==================');
//   });

//   req.on('error', error => {
//     console.log('=========REQUEST ERROR=============');
//     console.log(error);
//     console.log('=============END===================');
//   });

//   req.end(() => {
//     console.log('sendMessage end');
//   });
// };
const sendMessageAxios = () => axios.get(TELEGRAM_URL);

const testController = async (req, res) => {
  const { body } = req;
  console.log('=======1111111===========sendMessage(body);==================');
  console.log('sendMessage(body)1;');
  console.log('====================================');
  const { data } = await sendMessage(body);
  console.log('=========22222222=========sendMessage(body);==================');
  console.log('sendMessage(body);');
  console.log('====================================');
  const payload = {
    status: 'ok',
    payload: [
      {
        sended: moment().toISOString(),
        body,
        telegram: data
      }
    ]
  };

  return res.status(200).send(payload);
};

router.post('/send-message', testController);

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use((req, res, next) => {
  console.log('EXPRESS USE >>>> Time: ', moment().toISOString());
  next();
});

app.listen();
