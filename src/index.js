const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const fetch = require('node-fetch');
const router = express.Router();
const app = express();
const { API, TELEGRAM_CHANNEL } = require('./config')

const sendMessageFetch = msg => fetch(`${API.SEND_MESSAGE}?chat_id=${TELEGRAM_CHANNEL}&text=${msg}`);

const parserGitLabWebhook = data => {
  const formatData = {
    eventName: data.event_name,
    user: {
      name: data.user_name,
      avatar: data.user_avatar,
    },
    project: {
      name: data.project.name,
      url: data.project.web_url,
    },
    commits: data.commits,
    sshUrl: data.repository.git_ssh_url
  }

  return `
    Событие: ${formatData.eventName}\n
    Имя: ${formatData.user.name}\n
    ----------------------------\n
    Проект: ${formatData.project.name}\n
    [Ссылка](${formatData.project.url})\n
    ----------------------------\n
    Комиты: ${formatData.commits.length}
  `;
}

const sendMessage = (data) => {
  const text = parserGitLabWebhook(data)
  console.log('message ==>', text, '<== message')
  return fetch(API.SEND_MESSAGE, {
    method: "POST",
    body: {
      chat_id: TELEGRAM_CHANNEL,
      text,
      parse_mode: 'Markdown',
    }
  })
}

const textController = async (req, res) => {
  const { body } = req;

  // const message = JSON.stringify(body);
  console.log('body ===>', body, '<=== body');

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
    await sendMessage(body)
  } catch (error) {
    data = 'Error'

    await sendMessageFetch(data)
    await sendMessageFetch(error.message)
  }

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

router.post('/send-message', textController);

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use((req, res, next) => {
  console.log('EXPRESS USE Time: ', moment().toISOString());
  next();
});

app.listen();
