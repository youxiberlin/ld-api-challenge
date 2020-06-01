const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const sampleData = require('./sampleData');

const { expect } = chai;
chai.use(chaiHttp);

describe('Ld-API', () => {
	describe('valid input', () => {
		it('returns 200 and data', (done) => {
			chai.request(app)
				.post('/complexity')
				.type('form')
				.send({
					'text': sampleData.regular
				})
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('data');
					done();
				});
		});
	});

	describe('in valid input', () => {
		it('returns 400 and message when the input words exceeds the limit', (done) => {
			chai.request(app)
				.post('/complexity')
				.type('form')
				.send({
					'text': sampleData.invalidWords
				})
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.have.all.keys('message', 'status');
					done();
				});
		});

		it('returns 400 and message when the input characters exceeds the limit', (done) => {
			chai.request(app)
				.post('/complexity')
				.type('form')
				.send({
					'text': sampleData.invalidChars
				})
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body).to.have.all.keys('message', 'status');
					done();
				});
		});
	});
});
