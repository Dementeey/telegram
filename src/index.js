const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
const app = express();

const TOKEN = 'министерство_не_ваших_собачих_дел';
const PORT = parseInt(process.env.PORT, 10) || 80;

const testController = (req, res) => {
  const { body } = req;
  console.log('=?=body=?>', body)

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

router.get('/', testController);

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.listen(PORT, () => console.log('HTTP server listening on port %s', PORT));
