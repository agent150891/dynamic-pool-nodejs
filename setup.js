const mongoose = require('mongoose');
const Site = require('./services/site-service');

const mongoDB = 'mongodb://127.0.0.1/sitesdb';

const mockData = [
  { url: 'https://google.com', status: 'NEW', httpCode: null },
  { url: 'https://youtube.com', status: 'NEW', httpCode: null },
  { url: 'https://yandex.ru', status: 'NEW', httpCode: null },
  { url: 'https://gog.com', status: 'NEW', httpCode: null },
  { url: 'https://github.com', status: 'NEW', httpCode: null },
  { url: 'https://gitlab.com', status: 'NEW', httpCode: null },
  { url: 'https://mongodb.com', status: 'NEW', httpCode: null },
  { url: 'https://stackoverflow.com', status: 'NEW', httpCode: null },
  { url: 'https://stripe.com', status: 'NEW', httpCode: null }
];

console.log('setup is running');
let result;
async function setDb() {
  await mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
  const db = mongoose.connection;
  // result = await Site.setSiteList(mockData);
  console.log('result', result);
}
setDb();

// Site.getNewSiteLIst()
//   .then(res => {
//     console.log('result', result);
//     return res;
//   })
//   .catch(e => { console.log('e', e) })
//   // .finally(process.exit(0));

