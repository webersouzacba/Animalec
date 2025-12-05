const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
const express = require('express');
const app = express();


// LOG GLOBAL – colocar logo depois do app = express();
app.use((req, res, next) => {
  console.log('[REQ]', req.method, req.url);
  next();
});


app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

require('./init/db.js')(app, () => {
  require('./init/middleware')(app);
  require('./init/router')(app);
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log('Your app is listening on ' + port);
  });
});
