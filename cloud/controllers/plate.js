var LicensePlate = Parse.Object.extend("LicensePlate");
var Comment = Parse.Object.extend("Comment");

exports.postStart = function postStartF(req, res, next) {
    var state = req.body.state;
    var number = req.body.number;

    res.redirect('/plate/' + state + '/' + number);
};

exports.start = function startF(req, res, next) {
    var query = new Parse.Query(LicensePlate);
    query.find({
        success: function(plates) {
            res.render('getPlate', {plates: plates});
        },
        error: function(error) {
            console.log(error);
        }
    });
};

exports.comment = function commentF(req, res, next) {
};

exports.show = function showF(req, res, next) {
    var state = req.params.state;
    var number = req.params.number;
    var plate = null;
    var comments = [];

    var query = new Parse.Query(LicensePlate);
    query.equalTo('state', state);
    query.equalTo('number', number);

    query.first({
        success: function(plate) {
            console.log(plate);
            if (plate) {
                var query = new Parse.Query(Comment);
                query.equalTo('plate', plate);
                query.find({
                    success: function(comments) {
                        res.render('plate', {
                            plate: plate,
                            comments: comments,
                            state: state,
                            number: number
                        });
                    },
                    error: function(error) {
                        console.log(error);
                    }

                });
            } else {
                plate = new LicensePlate();
                plate.save({state: state, number: number});
                res.render('plate', {
                    plate: plate,
                    state: state,
                    number: number,
                    comments: []
                });
            }
        },

        error: function(error) {
            console.log(error);
        }
    });
};
