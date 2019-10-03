const assert = require('assert');
const rideUtil = require('../src/usecases/ride');

describe('rideUtil.validateAndCreateRideRequest', () => {

    it('should return empty string if no error', () => {

        let startLat= 0;
        let startLong = 0;
        let endLat = 0;
        let endLong = 0;
        let riderName = "Rider Name";
        let driverName = "Driver Name";
        let driverVehicle = "driver Vehicle";

        let e = rideUtil.validateAndCreateRideRequest(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle);

        assert.strictEqual(e, "");
    });

    it('should return proper error string if there is any', () => {

        let data = [
            [[-91, 0, 0, 0, "Rider Name", "Driver Name", "Driver Vehicle"],
            rideUtil.ERR_INVALID_START_LAT_LON],
            [[0, 0, -91, 0, "Rider Name", "Driver Name", "Driver Vehicle"],
            rideUtil.ERR_INVALID_END_LAT_LON],
            [[0, 0, 0, 0, "", "Driver Name", "Driver Vehicle"],
            rideUtil.ERR_INVALID_RIDER],
            [[0, 0, 0, 0, "Rider Name", "", "Driver Vehicle"],
            rideUtil.ERR_INVALID_DRIVER],
            [[0, 0, 0, 0, "Rider Name", "Driver Name", ""],
            rideUtil.ERR_INVALID_VEHICLE]
        ];

        data.forEach(function (d) {
            let e = rideUtil.validateAndCreateRideRequest(...d[0]);
            assert.strictEqual(e, d[1]);
        })
    });

});