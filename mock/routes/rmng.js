var _ = require('lodash');
var moment = require('moment');
var pgp = require('pg-promise')();
var dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'booking-room-system',
    user: 'postgres',
    password: 'postgres'
};
var db = pgp(dbConfig);
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    db.any("SELECT *" +
        "FROM rooms " +
        "WHERE isdeleted=false", [])
        .then(function (data) {
            data.forEach(function (element) {
                element.created = moment(element.created).format("YYYY-MM-DD");
            }, this);
            res.status(200).send({data: data});
            // success;
        })
        .catch(function (error) {
            res.status(500).send(error.message);
            // error;
        });
});

router.get('/status', function (req, res) {
    var query = "" +
        "SELECT " +
        "r.room_id, " +
        "r.name, " +
        "r.size, " +
        "b.from_date, " +
        "b.to_date, " +
        "b.description, " +
        "(SELECT name from users WHERE id=b.person) AS owner, " +
        "CASE " +
        "WHEN (from_date IS NULL AND to_date IS NULL) THEN 'free' " +
        "WHEN (b.from_date >= $1 ) THEN 'inter' " +
        "ELSE 'busy' " +
        "END AS status " +
        "FROM rooms r " +
        "LEFT JOIN ( " +
        "SELECT " +
        "b.room, " +
        "b.from_date, " +
        "b.to_date, " +
        "b.description, " +
        "b.person " +
        "FROM bookings b " +
        "WHERE " +
        "( $1 BETWEEN b.from_date AND b.to_date) " +
        "OR " +
        "(b.from_date >= $1 and b.from_date <= (timestamp $1 + interval '15 minutes')) " +
        "AND b.isdeleted=false " +
        ") b " +
        "ON b.room = r.room_id " +
        "WHERE r.isdeleted=false";

    if (req.query.date && req.query.date !== "") {
        var queryData = [];
        queryData.push(req.query.date);

        var nextParam = "$2";
        if (req.query.id) {
            query = query + (" AND r.room_id=" + nextParam);
            queryData.push(req.query.id);
            nextParam = "$3";
        }

        if (req.query.size) {
            query = query + (" AND r.size>=" + nextParam);
            queryData.push(req.query.size);
            nextParam = "$4";
        }

        db.any(query, queryData)
            .then(function (data) {
                res.status(200).send({data: data});
                // success;
            })
            .catch(function (error) {
                res.status(500).send(error);
                // error;
            });
    } else {
        res.status(500).send("Date is not valid");
    }
});

router.get('/room', function (req, res) {
    var queryRoom = "" +
        "SELECT " +
        "r.room_id, " +
        "r.name, " +
        "r.size, " +
        "b.from_date, " +
        "b.to_date, " +
        "b.description, " +
        "(SELECT name from users WHERE id=b.person) AS owner, " +
        "CASE " +
        "WHEN (from_date IS NULL AND to_date IS NULL) THEN 'free' " +
        "WHEN (b.from_date >= $1 ) THEN 'inter' " +
        "ELSE 'busy' " +
        "END AS status " +
        "FROM rooms r " +
        "LEFT JOIN ( " +
        "SELECT " +
        "b.room, " +
        "b.from_date, " +
        "b.to_date, " +
        "b.description, " +
        "b.person " +
        "FROM bookings b " +
        "WHERE " +
        "(( $1 >= b.from_date AND $1 < b.to_date) " +
        "OR " +
        "($1 < b.from_date AND (timestamp $1 + interval '15 minutes') > b.from_date)) " +
        "AND b.isdeleted=false " +
        ") b " +
        "ON b.room = r.room_id " +
        "WHERE ((r.isdeleted=false) AND (r.room_id=$2))";

    var queryMeetings = "" +
        "SELECT r.room_id, b.from_date, b.to_date " +
        "FROM rooms r " +
        "LEFT JOIN bookings b " +
        "ON b.room = r.room_id " +
        "WHERE ((r.room_id=$2) AND (b.from_date > $1) AND (b.to_date < (date('tomorrow')+ time '00:00:00'))) " +
        "ORDER BY b.from_date";

    if (req.query.date && req.query.date !== "" && req.query.id && req.query.id !== "") {
        var queryData = [];
        queryData.push(req.query.date);
        queryData.push(req.query.id);

        db.tx(function () {
            var q1 = db.any(queryRoom, queryData);
            var q2 = db.any(queryMeetings, queryData);

            return this.batch([q1, q2]);
        })
            .then(function (data) {
                var roomData = data[0][0];
                var meetings = data[1];
                var busyToDate = moment(roomData.to_date).format('YYYY-MM-DD HH:mm:ss');

                if (meetings.length > 0) { // if there are waiting meetings
                    if (roomData.status != 'busy') { //if free or inter
                        roomData.from_date = meetings[0].from_date; //begining of first waiting meeting
                    } else {
                        var i = 0;
                        while ((i < meetings.length) && (busyToDate === moment(meetings[i].from_date).format('YYYY-MM-DD HH:mm:ss'))) {
                            busyToDate = moment(meetings[i].to_date).format('YYYY-MM-DD HH:mm:ss');
                            i++;
                        }
                    }
                } else {
                    if (roomData.status === 'free') roomData.status = 'noBookings';
                }
                roomData.from_date = moment(roomData.from_date).format('YYYY-MM-DD HH:mm:ss');
                roomData.to_date = moment(roomData.to_date).format('YYYY-MM-DD HH:mm:ss');
                roomData.busy_to_date = busyToDate; //end of sequential meetings
                roomData.waitingMeetings = meetings.length; //waiting meetings count

                res.status(200).send({data: roomData});
            })
            .catch(function (error) {
                res.status(500).send(error.message);

            });
    }
    else {
        res.status(500).send("Date or ID is not valid");
    }
});

router.get('/list', function (req, res) {
    var queryRooms = "" +
        "SELECT " +
        "r.room_id, " +
        "r.name, " +
        "r.size, " +
        "b.from_date, " +
        "b.to_date, " +
        "b.description, " +
        "(SELECT name from users WHERE id=b.person) AS owner, " +
        "CASE " +
        "WHEN (from_date IS NULL AND to_date IS NULL) THEN 'free' " +
        "WHEN (b.from_date >= $1 ) THEN 'inter' " +
        "ELSE 'busy' " +
        "END AS status " +
        "FROM rooms r " +
        "LEFT JOIN ( " +
        "SELECT " +
        "b.room, " +
        "b.from_date, " +
        "b.to_date, " +
        "b.description, " +
        "b.person " +
        "FROM bookings b " +
        "WHERE " +
        "(( $1 >= b.from_date AND $1 < b.to_date) " +
        "OR " +
        "($1 < b.from_date AND (timestamp $1 + interval '15 minutes') > b.from_date)) " +
        "AND b.isdeleted=false " +
        ") b " +
        "ON b.room = r.room_id " +
        "WHERE (r.isdeleted=false) " +
        "ORDER BY r.room_id";

    var queryMeetings = "" +
        "SELECT r.room_id, b.from_date, b.to_date " +
        "FROM rooms r " +
        "LEFT JOIN bookings b " +
        "ON b.room = r.room_id " +
        "WHERE ((b.from_date > $1) AND (b.to_date < $1::timestamp::date + interval '1 day' + time '00:00:00')) " +
        "ORDER BY r.room_id, b.from_date";

    if (req.query.date && req.query.date !== "") {

        db.tx(function () {
            var q1 = db.any(queryRooms, req.query.date);
            var q2 = db.any(queryMeetings, req.query.date);

            return this.batch([q1, q2]);
        })
            .then(function (data) {
                var roomsList = data[0];
                var meetingsList = data[1];

                for (var i = 0; i < roomsList.length; i++) {
                    var roomMeetings = formRoomMeetings(roomsList[i].room_id, meetingsList);
                    roomsList[i] = updateRoomData(roomsList[i], roomMeetings);
                }

                res.status(200).send({data: roomsList});
            })
            .catch(function (error) {
                res.status(500).send(error.message);
            });
    }
    else {
        res.status(500).send("Date or ID is not valid");
    }
});

// Insert room
router.post('/', function (req, res) {
    var data = req.body;
    if (data && data.name !== '' && _.isNumber(data.size) && data.description !== '') {
        db.one("INSERT INTO rooms (name, owner, size, description) " +
            "SELECT $1, $2, $3, $4 " +
            "WHERE NOT EXISTS (SELECT room_id FROM rooms WHERE name = $1) " +
            "RETURNING room_id, created", [data.name, data.owner, data.size, data.description])
            .then(function (data) {
                if (_.isString(data)) {
                    res.status(500).send(data);
                }
                else {
                    res.status(200).send({room_id: data.room_id, created: data.created});
                }
                // success;
            })
            .catch(function (error) {
                res.status(500).send(error.message);
            });
    }
    else {
        res.status(500).send("Data is missing");
    }
});

// Update room
router.put('/', function (req, res) {
    var data = req.body;
    if (data && _.isNumber(data.room_id) && data.name !== '') {
        db.none("UPDATE rooms " +
            "SET name=$1, owner=$2, size=$3, description=$4 WHERE room_id=$5",
            [data.name, data.owner, data.size, data.description, data.room_id])
            .then(function (data) {

                res.sendStatus(200);
                // success;
            })
            .catch(function (error) {
                res.status(500).send(error.message);
                // error;
            });
    }
    else {
        res.status(500).send("No ID provided");
    }

});

// Delete room
router.delete('/', function (req, res) {
    var room_id = req.query.room_id;

    if (room_id !== undefined) {
        db.none("UPDATE rooms " + "SET isdeleted=true WHERE room_id=$1", [room_id])
            .then(function (room_id) {
                res.sendStatus(200);
                // success;
            })
            .catch(function (error) {
                res.status(500).send(error.message);
                // error;
            });
    }
    else {
        res.status(500).send("No ID provided");
    }
});

function formRoomMeetings(room_id, meetingsList) {
    var roomMeetings = [];
    for (var i = 0; i < meetingsList.length; i++) {
        if (meetingsList[i].room_id === room_id) {
            roomMeetings.push(meetingsList[i]);
        }
    }
    return roomMeetings;
}

function updateRoomData(roomData, meetings) {
    var busyToDate = moment(roomData.to_date).format('YYYY-MM-DD HH:mm:ss');

    if (meetings.length > 0) { // if there are waiting meetings
        if (roomData.status != 'busy') { //if free or inter
            roomData.from_date = meetings[0].from_date; //begining of first waiting meeting
        } else {
            var i = 0;
            while ((i < meetings.length) && (busyToDate === moment(meetings[i].from_date).format('YYYY-MM-DD HH:mm:ss'))) {
                busyToDate = moment(meetings[i].to_date).format('YYYY-MM-DD HH:mm:ss');
                i++;
            }
        }
    } else {
        if (roomData.status === 'free') roomData.status = 'noBookings';
    }
    roomData.from_date = moment(roomData.from_date).format('YYYY-MM-DD HH:mm:ss');
    roomData.to_date = moment(roomData.to_date).format('YYYY-MM-DD HH:mm:ss');
    roomData.busy_to_date = moment(busyToDate).format('YYYY-MM-DD HH:mm:ss'); //end of sequential meetings
    roomData.waitingMeetings = meetings.length; //waiting meetings count

    return roomData;
}

// Get room by ID
router.get('/:id', function (req, res) {
    if (req.query.id) {
        db.one("SELECT *" +
            "FROM rooms " +
            "WHERE isdeleted=false AND room_id=$1", [req.query.id])
            .then(function (data) {
                res.status(200).send({data: data});
                // success;
            })
            .catch(function (error) {
                res.status(500).send(error.message);
                // error;
            });
    } else {
        res.status(500).send("Invalid id");
    }
});

module.exports = router;