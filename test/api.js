const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Ld-API', () => {
	describe('valid input', () => {
		it('returns 200 and data', (done) => {
			chai.request(app)
				.post('/complexity')
				.type('form')
				.send({
					'text': 'hello world. I am yuki sato. what a beautiful day'
				})
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('data');
					done();
				});
		});
	});
});
