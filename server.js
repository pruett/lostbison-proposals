var throng  = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT    = process.env.PORT || 8888;

throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

function start() {
  //require('newrelic');
  var app = require('./index');

  app.listen(PORT, function() {
    console.log('Listening on port: ' + PORT);
  });
}
