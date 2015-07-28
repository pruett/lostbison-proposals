var request = require('supertest'),
    app = require('./../index');


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
