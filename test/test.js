var request = require('supertest'),
    app = require('./../lib/index');

//describe('Requests to (/) path', function() {

  //it('Returns a 200 status code', function(done) {

    //request(app)
      //.get('/')
      //.expect(200, done)

  //});

  //it('Returns HTML Content Type', function(done) {

    //request(app)
      //.get('/')
      //.expect('Content-Type', /html/, done)

  //});

  //it('Shows an Itinerary section', function(done) {

    //request(app)
      //.get('/')
      //.expect(/itinerary/i, done)

  //});

  //it('Shows an RSVP section', function(done) {

    //request(app)
      //.get('/')
      //.expect(/rsvp/i, done)

  //});
//});

describe('Creating project proposals', function() {

  it('Returns a 201 status code when all fields are provided', function(done) {

    request(app)
      .post('/proposal')
      .send({"fullName":"Kevin Pruett","email":"pruett.kevin@gmail.com","phone":"1234567890","projectDetails":"details of project here\n\nthis is a really important project","budget":["$10,000","$31,000"]}, done)
      .expect(201, done);

  });

  it('Returns 400 if some fields are left blank', function(done) {

    request(app)
      .post('/proposal')
      .send({"fullName":"Kevin Pruett","email":"pruett.kevin@gmail.com","projectDetails":"details of project here\n\nthis is a really important project","budget":["$10,000","$31,000"]}, done)
      .expect(400, done);

  });
});
