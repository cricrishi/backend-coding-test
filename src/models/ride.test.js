const assert = require('assert');
const rideModel = require('../src/models/ride');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../src/schemas');

describe('model', () => {

    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('model.createRide',  function () {

        it("should create a ride", function () {

            let startLat= 0;
            let startLong = 0;
            let endLat = 0;
            let endLong = 0;
            let riderName = "Rider Name";
            let driverName = "Driver Name";
            let driverVehicle = "driver Vehicle";

            return rideModel(db).createRide(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
                .then(rows => {
                    assert(rows.length > 0);
                    assert.strictEqual(rows[0].riderName, "Rider Name");
                });
        })
    });

    describe('rideModel.getRideByID',  function () {

        it("should get a ride based on ID", function () {

            return model(db).getRideByID(1)
                .then(rows => {
                    assert(rows.length > 0);
                });
        })
    });

    describe('rideModel.getRides',  function () {

        it("should get a list of rides based on limit and offset", function () {

            return model(db).getRides(0, 10)
                .then(rows => {
                    assert(rows.length > 0);
                });
        })
    });

});