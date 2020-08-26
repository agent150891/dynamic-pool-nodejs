const mongoose = require('mongoose');
const { StaticPool, DynamicPool } = require('node-worker-threads-pool');
const Site = require('./services/site-service');
require('dotenv').config();

const mongoDB = process.env.MONGO_URL;

const start = async function startApp() {
  await mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
  const db = mongoose.connection;

  let result = await Site.getNewSiteLIst();
  console.log('Result getNewSiteLIst', result);
  const pool = new DynamicPool(Number(process.env.WORKER_NUMBER));

  for (let i = 0; i < result.length; i++) {
    pool
      .exec({
        param: result[i],
        task: (async (data) => {
          const site = require('./services/site-service');
          return await site.setSiteData(data);
        })
      });
  }
}

start();