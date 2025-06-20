const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const BASE_URL = "https://restful-booker.herokuapp.com";

describe("Restful Booker API Tests", () => {
  let token = null;
  let bookingId = null;
  before(async () => {
    const response = await request(BASE_URL)
      .post("/auth")
      .set("Content-Type", "application/json")
      .send({
        username: "admin",
        password: "password123",
      });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("token");
    token = response.body.token;
  });

  it("Create a booking", async () => {
    const response = await request(BASE_URL)
      .post("/booking")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        firstname: "John",
        lastname: "Doe",
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-01",
        },
        additionalneeds: "Breakfast, Dinner",
      });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("bookingid");
    expect(response.body.booking).to.include({
      firstname: "John",
    });
    bookingId = response.body.bookingid;
  });

  it("Get created booking by id", async () => {
    const response = await request(BASE_URL)
      .get(`/booking/${bookingId}`)
      .set("Accept", "application/json");
    expect(response.statusCode).to.equal(200);
    expect(response.body.firstname).to.equal("John");
    expect(response.body.totalprice).to.equal(200);
  });

  it("Update booking", async () => {
    const response = await request(BASE_URL)
      .put(`/booking/${bookingId}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Cookie", `token=${token}`)
      .send({
        firstname: "James",
        lastname: "Brown",
        totalprice: 150,
        depositpaid: false,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-01",
        },
        additionalneeds: "",
      });
    expect(response.statusCode).to.equal(200);
    expect(response.body.totalprice).to.equal(150);
    expect(response.body.depositpaid).to.be.false;
    expect(response.body.additionalneeds).to.have.lengthOf(0);
  });

  it("Delete booking", async () => {
    const response = await request(BASE_URL)
      .delete(`/booking/${bookingId}`)
      .set("Content-Type", "application/json")
      .set("Cookie", `token=${token}`);
    expect(response.statusCode).to.equal(201);
  });
});
