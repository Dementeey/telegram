const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();

const PORT = parseInt(process.env.PORT, 10) || 9000;
const PREFIX = '/api';
const app = express();

const testController = (req, res) => {
  const { body } = req;

  const payload = {
    status: 'ok',
    payload: [
      {
        createdAt: moment().toISOString()
      }
    ]
  };
  return res.status(201).send(payload);
};

router.post('/test', testController);

app.use(cors());
app.use(bodyParser.json());
app.use(PREFIX, router);
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.listen(PORT, () => console.log('HTTP server listening on port %s', PORT));
