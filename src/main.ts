import dayjs = require('dayjs');
import dotenv = require('dotenv');
import fetch from 'node-fetch';

const run = async () => {
  dotenv.config();
  const projectUrl = process.env.PROJECT_ROOT;
  const form = process.argv.pop();
  const params = {
    select: ['_id', 'created', 'modified'].join(','),
    modified__gt: dayjs().subtract(1, 'd').toISOString(),
  };
  const url = `${projectUrl}/form/${form}/submission?${new URLSearchParams(
    params,
  ).toString()}`;

  const res = await fetch(url, {
    headers: {
      'x-token': process.env.API_KEY,
    },
  });
  const submissions = await res.json();
  console.log(submissions);
};
run();
