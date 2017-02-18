var Ticket = require('../models/ticket');

exports.view_all = function(req, res) {
    var page = parseInt(req.query.page);
    var size = 10;
    var skip = page > 0 ? ((page - 1) * size) : 0;
    Ticket.find(null,null, {
        skip: skip,
        limit: size
    },
    function(err, tickets) {
        res.render('ticket/view-all', {
            title: "All Tickets",
            tickets: tickets
        });
    });
}

exports.view = function(req, res) {
    Ticket.findOne({"ticketSchema._id": req.params.id}, function(err, ticket) {
        if (ticket) {
            console.log(ticket)
            res.render('ticket/view', {ticket});
        }
    });
}

/*
//this is just here temporarily to debug view's styling. Will be replaced with the above commented code
exports.view = function(req,res) {
    res.render('ticket/view');
}
*/

exports.create = function(req, res) {
    res.render('ticket/create');
}

exports.submit = function(req, res) {
    // Check for missing fields
    console.log(req.body);
    req.checkBody('hackerName', 'No hacker name provided').notEmpty();
    req.checkBody('hackerLocation', 'No location provided').notEmpty();
    req.checkBody('problemTitle', 'No title submitted').notEmpty();
    req.checkBody('problemDescription', 'No problem description provided').notEmpty();

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            res.status(400).render('ticket/create', {errors: result.array()});
        }
    })

    var ticket = Ticket();
    ticket.hackerName = req.body.hackerName;
    ticket.hackerPhoneNumber = req.body.hackerPhoneNumber;
    ticket.hackerLocation = req.body.hackerLocation;
    ticket.problemTitle = req.body.problemTitle;
    ticket.problemDescription = req.body.problemDescription;
    ticket.status = "Open";
    ticket.projectName = req.body.projectName;
    tags = req.body.problemTags;

    ticket.problemTags = tags.split(',');

    ticket.save(function(err) {
        if (err) {
            res.send(err);
        }
    });
    res.sendStatus(201);
}