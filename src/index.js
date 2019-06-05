const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const fetch = require('node-fetch');
const router = express.Router();
const app = express();

const GIT_LAB_TOKEN = 'министерство_не_ваших_собачих_дел';

const TELEGRAM_HOST = 'api.telegram.org';
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL || '-1001325374489';
const TELEGRAM_TOKEN =
  process.env.TELEGRAM_TOKEN || '628940363:AAFidkqan-HYJpJyvjKpDVcVHtX3OxT6w6s';
const TELEGRAM_URL = `https://${TELEGRAM_HOST}/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHANNEL}&text=`;

const sendMessageFetch = msg => fetch(`${TELEGRAM_URL}${msg}`);

const testController = async (req, res) => {
  const { body, headers } = req;

  console.log('============body====================');
  console.log(body);
  console.log('======headers=======================');
  console.log(headers);
  console.log('====================================');

  const message = `
    Тип: ${body.object_kind}
    Событие: ${body.event_name}
    Имя: ${body.user_name}
    Username: ${body.user_username}
    [Аватар](${body.user_avatar})
    ----------------------------
    ref: ${body.ref}
  `;

  // *bold text*
  // _italic text_
  // [inline URL](http://www.example.com/)
  // [inline mention of a user](tg://user?id=123456789)
  // `inline fixed-width code`
  // ```block_language
  // pre-formatted fixed-width code block
  // ```

  // {
  //   "before":"e2dafd06df77a343ebc3324c690bae50c911a66d",
  //   "after":"dafb6b609d6112e6129097b1e8630f9d03da821e",
  //   "ref":"refs/heads/master",
  //   "checkout_sha":"dafb6b609d6112e6129097b1e8630f9d03da821e",
  //   "user_id":4024677,
  //   "user_name":"A. L.",
  //   "user_username":"metallist9656",
  //   "user_email":"",
  //   "user_avatar":"https://secure.gravatar.com/avatar/43916ce158a8ed688b32901327e280c2?s=80"
  // }

  let data;

  try {
    data = await sendMessageFetch(message).then(r => r.json());
  } catch (error) {
    console.log('====err=================');
    console.log(error.message);
    console.log('=======end-err==========');
  }
  console.log('=============data;==================');
  console.log('data', data);
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
