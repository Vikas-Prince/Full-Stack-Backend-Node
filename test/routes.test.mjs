import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("API Routes", function () {
  it("should return status 200 for health check route", (done) => {
    request(app)
      .get("/health")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("ok!");
        done();
      });
  });

  it("should return all locations", (done) => {
    request(app)
      .get("/location")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array"); // Assuming response is an array
        done();
      });
  });

  // it("should return restaurants filtered by stateId", (done) => {
  //   request(app)
  //     .get("/restaurant?stateId=1")
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body).to.be.an("array");
  //       expect(res.body[0]).to.have.property("state_id", 1);
  //       done();
  //     });
  // });

  it("should return meal types", (done) => {
    request(app)
      .get("/mealType")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  // it("should return filtered restaurants based on filters", (done) => {
  //   request(app)
  //     .get("/filters/1?cuisineId=2&hcost=500&lcost=100")
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body).to.be.an("array");
  //       expect(res.body[0])
  //         .to.have.property("cost")
  //         .that.is.greaterThan(100)
  //         .and.lessThan(500);
  //       done();
  //     });
  // });

  it("should return details of a selected restaurant", (done) => {
    request(app)
      .get("/details/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0]).to.have.property("restaurant_id", 1);
        done();
      });
  });

  it("should return menu details for a restaurant", (done) => {
    request(app)
      .get("/menu/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should return menu details for multiple menus", (done) => {
    request(app)
      .post("/menuDetails")
      .send({ id: [1, 2, 3] })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should return all orders", (done) => {
    request(app)
      .get("/orders")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should place an order", (done) => {
    request(app)
      .post("/placeOrder")
      .send({
        restaurant_id: 1,
        items: [{ menu_id: 1, quantity: 2 }],
        email: "test@example.com",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Order Placed");
        done();
      });
  });

  it("should update an order", (done) => {
    request(app)
      .put("/updateOrder")
      .send({
        _id: "some_order_id",
        status: "Delivered",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("status", "Delivered");
        done();
      });
  });

  it("should delete an order", (done) => {
    request(app)
      .delete("/deleteOrder")
      .send({ _id: "some_order_id" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Data Deleted");
        done();
      });
  });
});
