const http = require('http');
const https = require('https');

const options = {
  host: 'jsonplaceholder.typicode.com',
  port: 80,
  path: '/posts/1',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
const request = data => {
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

module.exports = request;
