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

const disableWebPreview = true;
const disableNotification = true;

const sendMessageFetch = msg => fetch(`${API.SEND_MESSAGE}?chat_id=${TELEGRAM_CHANNEL}&disable_web_page_preview=${disableWebPreview}&disable_notification=${disableNotification}&parse_mode=markdown&text=${msg}`);


const messageFormatter = formatData => encodeURI(`Проект: ${formatData.project.name} 
Ссылка: [${formatData.project.url}](${formatData.project.url})
---------------------------
Событие: ${formatData.eventName}
Имя: ${formatData.user.name}
Колл. Комитов: + ${formatData.commits.length}
${formatData.commits.length > 0 ? formatData.commits.reduce((init, item, index) => {
  init += `
    Коммит: ${index + 1}:
    ================================================
      \t кто: ${item.author.name}
      \t когда: ${moment(item.timestamp)}
      \t что сказал: ${item.message}
      \t сколько добавил: ${item.added.length}
      \t сколько изменил: ${item.modified.length}
      \t сколько удалил: ${item.removed.length}
      \t на сам посмотри: [${item.id.slice(0, 9)}](${item.url})
    ================================================
    `

  return init
}, '') : ''}
`)

// Git Lab
const parserGitLabWebhook = data => messageFormatter({
  eventName: data.event_name,
  user: {
    name: data.user_name,
  },
  project: {
    name: data.project.name,
    url: data.project.web_url,
  },
  commits: data.commits,
  sshUrl: data.repository.git_ssh_url
})

// Git Hab
const parserGitHabWebhook = data => messageFormatter({
  eventName: data.event_name,
  user: {
    name: data.user_name,
  },
  project: {
    name: data.repository.name,
    url: data.repository.url,
  },
  commits: data.commits,
  sshUrl: data.repository.git_ssh_url
})

const textController = async (req, res) => {
  const { body, headers, header } = req
  let telegramStatus
  let telegramError

  try {
    await sendMessageFetch(parserGitLabWebhook(body))

    telegramStatus = 'ok'
  } catch (error) {
    console.log('error =>>', error.message, '<<= error')

    telegramStatus = 'Error'
    telegramError = error
  }

  console.log('body.commits ===>', body.commits, '<------ body.commits')
  console.log('header ===>', header, '<------ header')
  console.log('headers ===>', headers, '<------ headers')
  console.log('telegramStatus', telegramStatus)

  return res.status(200).send({
    status: telegramStatus,
    error: telegramError
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

app.listen(3000);
