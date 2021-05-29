const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert, expect } = chai;

chai.use(chaiHttp);

// Assertion style
chai.should();

describe("AUTHENTICATION API", function () {
  /**
   * TEST REGISTER NEW USER
   */
  describe("Register", async () => {
    it("should sign up a new user", (done) => {
      let body = {
        name: "new Person",
        email: "newperson@newemail.com",
        password: "newPassword",
      };
      chai
        .request("http://localhost:3000/api/v1")
        .post("/auth/register")
        .set("Content-Type", "application/json")
        .send(body)
        .end((err, res) => {
          id = res.body.payload;
          if (err) done(err);
          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isObject(res.body.payload);
          assert.isTrue(res.body.success);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.body.payload.should.have.property("name");
          res.body.payload.should.have.property("email");
          res.body.payload.should.have.property("password");
          res.should.have.status(200);
          done();
        });
    });
  });
  /**
   * TEST LOGIN USER
   */
  describe("Login", async () => {
    it("should login user by email and password", (done) => {
      let body = {
        email: "newperson@newemail.com",
        password: "newPassword",
      };
      chai
        .request("http://localhost:3000/api/v1")
        .post("/auth/login")
        .set("Content-Type", "application/json")
        .send(body)
        .end((err, res) => {
          id = res.body.payload;
          if (err) done(err);
          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isObject(res.body.payload);
          assert.isTrue(res.body.success);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.body.payload.should.have.property("name");
          res.body.payload.should.have.property("email");
          res.body.payload.should.have.property("password");
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * TEST GET LOGGEDIN USER
   */

  describe("Get LoggedIn USer", async () => {
    it("should get Loggedin user with token", (done) => {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjBkMDNjZDMzOGQ0MmMyNGY5MGJiYSIsImlhdCI6MTYyMjI3NzY4NywiZXhwIjoxNjI0ODY5Njg3fQ.LXFG7oH7iszXiAsOsvOcOcPBIcP4821S8hIzbL1Fp68";
      chai
        .request("http://localhost:3000/api/v1")
        .get("/auth/me")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          id = res.body.payload;
          if (err) done(err);
          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isObject(res.body.payload);
          assert.isTrue(res.body.success);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.body.payload.should.have.property("name");
          res.body.payload.should.have.property("email");
          res.should.have.status(200);
          done();
        });
    });
  });
});
