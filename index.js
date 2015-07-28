var express    = require('express'),
    bodyParser = require('body-parser'),
    jsonParse  = bodyParser.json(),
    sendgrid   = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
    compress   = require('compression'),
    app        = express();

var sendEmail = function(data, res) {
  var emailBody  = 'Client: ' + data.fullName + "\n\n";
      emailBody += 'Email: ' + data.email + "\n\n";
      emailBody += 'Phone: ' + data.phone + "\n\n";
      emailBody += 'Project Details: ' + data.projectDetails + "\n\n";
      emailBody += 'Budget: ' + data.budget;

  sendgrid.send({
    to:       'pruett.kevin@gmail.com',
    from:     'kevin@kevinpruett.com',
    subject:  'Proposal request from ' + data.email + ' for ' + data.budget[0] + ' - ' + data.budget[1] + '!',
    text:     emailBody
  }, function(err, json) {
    if (err) {
      console.error("Unable to send via SendGrid: " + err);
      res.sendStatus(500);
      return false;
    }

    res.sendStatus(201);
  });
};

app.use(compress());

app.post('/proposal', jsonParse, function(req, res) {
  var proposal = req.body;

  if (!proposal.fullName || !proposal.email || !proposal.phone || !proposal.projectDetails) {
    res.sendStatus(400);
    return false;
  }

  sendEmail(proposal, res);

});

module.exports = app;
