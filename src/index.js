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

  return 'Событие: ' + formatData.eventName + '\n' +
    "Имя: " + formatData.user.name + "\n" +
    "----------------------------\n" +
    "Проект: " + formatData.project.name + "\n" +
    "[Ссылка](" + formatData.project.url + ")" + "\n" +
    "----------------------------\n" +
    "Комиты: " + formatData.commits.length

}

const textController = async (req, res) => {
  let telegramStatus

  const { body } = req;
  console.log('api', API)
  console.log('TELEGRAM_CHANNEL', TELEGRAM_CHANNEL)
  try {
    await fetch(API.SEND_MESSAGE, {
      method: "POST",
      body: {
        chat_id: TELEGRAM_CHANNEL,
        text: parserGitLabWebhook(body),
        parse_mode: 'markdown',
      }
    })

    telegramStatus = 'ok'

  } catch (error) {
    telegramStatus = 'Error'
    console.log('error =>>', error.message, '<<= error')
  }

  console.log('telegramStatus', telegramStatus)

  return res.status(200).send({
    status: 'ok',
    payload: [
      {
        sended: moment().toISOString(),
        body,
        telegram: telegramStatus
      }
    ]
  });
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
