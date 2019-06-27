const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should()
const expect = chai.expect
const assert = chai.assert

const faker = require('faker');
const PORT = process.env.PORT || 1337;

let fileName1 = faker.random.alphaNumeric(7);
const fileName2 = faker.random.alphaNumeric(7);
const endpoint = `http://localhost:${PORT}`;

describe('Json DB Challenge tests', () => {
  describe('Express PUT API for creating and editing data', () => {
    it('it should add new student', async (done) => {
      chai.request(endpoint)
        .put(`/data/${fileName1}/favorites`)
        .send({language: 'En'})
        .set('Content-Type','application/json')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          expect(res).to.have.status(200);
          done();
        });      
    });
  
    it('it should add new properties in student record', async (done) => {
      chai.request(endpoint)
        .put(`/data/${fileName1}/favorites/genre/action/speed`)
        .send({Rating: 7})
        .set('Content-Type','application/json')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          expect(res).to.have.status(200);
          done();
        });      
    });
  });

  describe('Express GET API for fetching data', () => {
    it('it fetch invalid student with 404 (status code)', async (done) => {
      chai.request(endpoint)
        .get(`/data/${fileName2}`)
        .end((err, res) => {

          if(err) {
            return done(err);
          }
          const status = res.status;
          expect(status).to.equal(404)
          done();
        });
    });

    it('it fetch valid Properties from student', async (done) => {
      chai.request(endpoint)
        .get(`/data/${fileName1}`)
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          expect(res.status).to.equal(200);
          const body = res.body;

          // checking JSON properties
          expect(body).to.have.own.property('data');
          expect(body.data).to.have.own.property('favorites');
          expect(body.data.favorites).to.have.own.property('language');
          expect(body.data.favorites.language).to.be.equal('En');

          done();
        });
    });
  });

  describe('Express DELETE API for removing data', () => {
    
    it('it should remove wrong student with 404 (status code)', async (done) => {
      chai.request(endpoint)
        .delete(`/data/${fileName2}`)
        .end((err, res) => {

          if(err) {
            return done(err);
          }
          const status = res.status;
          expect(status).to.equal(404)
          done();
        });
    });
    
    it('it should remove property from student record', async (done) => {
      chai.request(endpoint)
        .delete(`/data/${fileName1}/favorites/genre/`)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          expect(res).to.have.status(200);
          done();
        });      
    });

    it('it should remove student record', async (done) => {
      chai.request(endpoint)
        .delete(`/data/${fileName1}`)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          expect(res).to.have.status(200);
          done();
        });      
    });
  });
});
