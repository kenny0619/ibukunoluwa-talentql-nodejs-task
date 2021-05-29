const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert, expect } = chai;

chai.use(chaiHttp);

// Assertion style
chai.should();
let id;

describe("POSTS API", function () {
  /**
   * TEST THE SINGLE FETCH GET ROUTE
   */
  describe("Fetch all posts", async () => {
    it("should return all posts", (done) => {
      chai
        .request("http://localhost:3000/api/v1/posts")
        .get("/")
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isArray(res.body.payload);
          assert.isNumber(res.body.count);
          assert.isTrue(res.body.success);
          assert.isObject(res.body.pagination);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * TEST THE ALL FETCH GET ROUTE
   */
  describe("Fetch single post by id", async () => {
    it("should return a post by id", (done) => {
      id = "60b1c6ec63291f466c28c6f7";
      chai
        .request("http://localhost:3000/api/v1")
        .get(`/posts/${id}`)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isObject(res.body.payload);
          assert.isTrue(res.body.success);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * TEST THE POST ROUTE
   */
  describe("Publish new post", async () => {
    it("should publish/create a new post", (done) => {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjBkMDNjZDMzOGQ0MmMyNGY5MGJiYSIsImlhdCI6MTYyMjI2NjA5NiwiZXhwIjoxNjI0ODU4MDk2fQ.7rralezvlzHcIPTdM62CPwN5agLRN4pSuuk0UenQN0U";
      let body = {
        title: "testing publish post",
        content: "this is a test content",
      };
      chai
        .request("http://localhost:3000/api/v1")
        .post("/posts")
        .set("Authorization", "Bearer " + token)
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
          expect(res.body.statusCode).to.eql(201);
          res.body.payload.should.have.property("title");
          res.body.payload.should.have.property("content");
          res.body.payload.should.have.property("slug");
          res.should.have.status(201);
          done();
        });
    });
  });

  /**
   * TEST THE PATCH ROUTE
   */
  describe("Edit a post", async () => {
    it("should edit a post", (done) => {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjBkMDNjZDMzOGQ0MmMyNGY5MGJiYSIsImlhdCI6MTYyMjI2NjA5NiwiZXhwIjoxNjI0ODU4MDk2fQ.7rralezvlzHcIPTdM62CPwN5agLRN4pSuuk0UenQN0U";
      let update = {
        title: "i am tired of tests failing",
        content: "whatever is going on",
      };

      id = id._id;
      chai
        .request("http://localhost:3000/api/v1")
        .patch(`/posts/${id}`)
        .set("Authorization", "Bearer " + token)
        .send(update)
        .end((err, res) => {
          if (err) done(err);

          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isObject(res.body.payload);
          assert.isTrue(res.body.success);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.body.payload.should.have.property("title");
          res.body.payload.should.have.property("content");
          res.body.payload.should.have.property("slug");
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * TEST THE DELETE ROUTE
   */
  describe("Delete a post", async () => {
    it("should delete a post", (done) => {
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjBkMDNjZDMzOGQ0MmMyNGY5MGJiYSIsImlhdCI6MTYyMjI2NjA5NiwiZXhwIjoxNjI0ODU4MDk2fQ.7rralezvlzHcIPTdM62CPwN5agLRN4pSuuk0UenQN0U";

      id = id;
      console.log(id, "delete");
      chai
        .request("http://localhost:3000/api/v1")
        .delete(`/posts/${id}`)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          if (err) done(err);
          expect(err).to.be.null;
          expect("Content-Type", /json/);
          assert.isObject(res.body);
          assert.isNull(res.body.payload);
          assert.isTrue(res.body.success);
          assert.isNull(res.body.error);
          expect(res.body.statusCode).to.eql(200);
          res.should.have.status(200);
          done();
        });
    });
  });
});
