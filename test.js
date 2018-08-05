var assert = require("assert");
var url = "http://preview.airwallex.com:30001/bank";

var chai = require("chai"),
  chaiHttp = require("chai-http");
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(require("chai-string"));

const params = {
  payment_method: "SWIFT",
  bank_country_code: "US",
  account_name: "John Smith",
  account_number: "123",
  swift_code: "ICBCUSBJ",
  aba: "11122233A"
};

describe("Success case", function() {
  it("should return success when all values passed", function(done) {
    chai
      .request(url)
      .post("/")
      .send(params)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.res.text).to.eql('{"success":"Bank details saved"}');
        done();
      });
  });
});

describe("Failure cases", function() {
  it("should return error when payment_method missing", function(done) {
    let data = Object.assign({}, params);
    data.payment_method = "";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res.res.text).to.eql(
          "{\"error\":\"'payment_method' field required, the value should be either 'LOCAL' or 'SWIFT'\"}"
        );
        done();
      });
  });

  it("should return error when bank_country_code is blank", function(done) {
    let data = Object.assign({}, params);
    data.bank_country_code = "";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should return error when bank_country_code not in  US, AU, CN", function(done) {
    let data = Object.assign({}, params);
    data.bank_country_code = "IN";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should return error when account_number is blank", function(done) {
    let data = Object.assign({}, params);
    data.account_number = "";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.res.text).to.eql(
          '{"error":"\'account_number\' is required"}'
        );
        done();
      });
  });


it("should return error when US account_number is longer than 17 characters", function(done) {
    let data = Object.assign({}, params);
    data.account_number = "939495848372819481";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.res.text).to.eql(
          '{"error":"\'account_number\' is required"}'
        );
        done();
      });
  });

it("should return error when AU account_number is longer than 9 characters", function(done) {
    let data = Object.assign({}, params);
    data.account_number = "9394958483";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.res.text).to.eql(
          '{"error":"\'account_number\' is required"}'
        );
        done();
      });
  });

it("should return error when CN account_number is longer than 20 characters", function(done) {
    let data = Object.assign({}, params);
    data.account_number = "294837281738473827361";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.res.text).to.eql(
          '{"error":"\'account_number\' is required"}'
        );
        done();
      });
  });

it("should return error when country is AU and bsb is blank", function(done) {
    let data = Object.assign({}, params);
    data.bsb = "";
    chai
      .request(url)
      .post("/")
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.res.text).to.eql(
          '{"error":"\'account_number\' is required"}'
        );
        done();
      });
  });
});
