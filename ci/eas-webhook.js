const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const safeCompare = require('safe-compare');
const dotenv = require('dotenv');
const { https } = require('follow-redirects'); // or 'https' for https:// URLs
const fs = require('fs');
const url = require('url');

dotenv.config({ path: `${__dirname}/./../.env` });

const app = express();
app.use(bodyParser.text({ type: '*/*' }));
app.post('/webhook', (req, res) => {
  const expoSignature = req.headers['expo-signature'];
  // process.env.EXPO_WEBHOOK_KEY has to match SECRET value set with `eas webhook:create` command
  const hmac = crypto.createHmac('sha1', process.env.EXPO_WEBHOOK_KEY);
  hmac.update(req.body);
  const hash = `sha1=${hmac.digest('hex')}`;
  if (false) { //(!safeCompare(expoSignature, hash)) {
    res.status(500).send("Signatures didn't match!");
  } else {
    // do something here, like send a notification to Slack!
    res.send('OK!');
    const body = JSON.parse(req.body);
    if (body.status === 'errored') {
      console.log('BUILD FAILED');
    } else if (body.status === 'finished') {
      console.log('BUILD SUCCESS - DOWNLOADING APP BUILD');
      const file = fs.createWriteStream('../production/app.tar.gz');
      const request = https.get(body.artifacts.buildUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('DONE DOWNLOAD');
        });
      });
    } else {
      console.log('UNHANDLED BUILD CONDITION');
      console.log(req.body);
    }
  }
});
app.listen(8080, () => console.log('Listening on port 8080'));
