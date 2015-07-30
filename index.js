var express    = require('express'),
    bodyParser = require('body-parser'),
    jsonParse  = bodyParser.json(),
    sendgrid   = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
    compress   = require('compression'),
    app        = express();

var sendEmail = function(data, res) {
  var emailBody  = "This is an automated confirmation of your project submission\n\n";
      emailBody += "Please do not reply to this email. You will hear from us shortly!\n\n";
      emailBody += "---------------------------------------------\n\n";
      emailBody += 'Name: ' + data.fullName + "\n\n";
      emailBody += 'Email: ' + data.email + "\n\n";
      emailBody += 'Phone: ' + data.phone + "\n\n";
      emailBody += "Project Details:\n\n" + data.projectDetails + "\n\n";
      emailBody += 'Budget: ' + data.budget;

  sendgrid.send({
    to:       data.email,
    from:     'no+reply@lostbison.com',
    subject:  'Thanks for your project submission!',
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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/proposal', jsonParse, function(req, res) {
  var proposal = req.body;

  if (!proposal.fullName || !proposal.email || !proposal.phone || !proposal.projectDetails) {
    res.sendStatus(400);
    return false;
  }

  sendEmail(proposal, res);

});

module.exports = app;
