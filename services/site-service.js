const mongoose = require('mongoose');
const SiteSchema = require('./../site-schema');
const rp = require('request-promise');
const request = require('request');

const Site = mongoose.model('Site', SiteSchema);

async function getNewSiteLIst() {
  return Site.find().where('status').equals('DONE').exec();
}

async function setSiteList(data) {
  console.log('INSERTDE DATA', data);
  return Site.insertMany(data);
}

async function setSiteData(data, i) {
  console.log(`UPDATE DATA -> ${data._doc.url}`);
  let res;
  await request({
    uri: data._doc.url
  })
    .on('response', async (response) => {
      console.log(response.statusCode);
      res = response.statusCode;
    })
    .on('error', async (err) => {
      console.log("Problem reaching URL: ", err);
    })
    .on('end', async () => {
      const newData = {
        httpCode: res,
        status: res >= 400 ? 'ERROR' : 'DONE'
      };
      console.log(newData);
      console.log('data._doc.url', data._doc.url);
      const doc = await Site.findOne({url: data._doc.url});
      console.log('doc', doc.status);
      await doc.update(newData);
    });
}

module.exports = {
  getNewSiteLIst: getNewSiteLIst,
  setSiteList: setSiteList,
  setSiteData: setSiteData
}