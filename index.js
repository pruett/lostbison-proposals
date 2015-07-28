var express     = require('express'),
    bodyParser  = require('body-parser'),
    jsonParse   = bodyParser.json(),
    postmark    = require('postmark'),
    client      = new postmark.Client(process.env.POSTMARK_TOKEN);
    compress    = require('compression'),
    app         = express();

app.use(compress());

//app.get('/', function(req, res) {
  //res.sendStatus(200);
//});

//app.get('/rsvps', function(req, res) {
  //MongoClient.connect(url, function(err, db) {
    //var collection = db.collection('rsvps');
    //collection.find().toArray(function(err, docs) {
      //if (!err) {
        //res.render('rsvps', { rsvps: docs });
      //}
    //});
  //});
//});

app.post('/proposal', jsonParse, function(req, res) {
  var proposal = req.body;

  if (!proposal.fullName || !proposal.email || !proposal.phone || !proposal.projectDetails) {
    res.sendStatus(400);
    return false;
  }

  console.log(proposal);

  client.sendEmail({
    "From": "donotreply@example.com", 
    "To": "pruett.kevin@gmail.com", 
    "Subject": "Test", 
    "TextBody": "Test Message"
  }, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
        return res.sendStatus(500);
    }
    console.info("Sent to postmark for delivery")
  });

  return res.sendStatus(201);
});

module.exports = app;
