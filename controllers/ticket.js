var Ticket = require('../models/ticket');

exports.view_all = function(req, res) {
    tickets.find(function(err, tickets) {
        res.render('ticket/view-all', {
            title: "All Tickets",
            tickets: tickets
        });
    });
}


/*
exports.view_all = function(req,res) {
    res.render('ticket/view-all');
}
*/



exports.view = function(req, res) {
    Ticket.findOne({"ticketSchema._id": req.params.id}, function(err, ticket) {
        if (ticket) {
            res.render('ticket/view', {
                title: ticket.problemTitle
            });
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
    var ticket = Ticket();
    ticket.hackerName = req.body.hackerName;
    ticket.hackerPhoneNumber = req.body.hackerPhoneNumber;
    ticket.hackerLocation = req.body.hackerLocation;
    ticket.problemTitle = req.body.problemTitle;
    ticket.problemDescription = req.body.problemDescription;
    ticket.status = "Open";
    tags = req.body.problemTags;

    ticket.problemTags = tags.split(',');

    ticket.save(function(err) {
        if (err) {
            res.send(err);
        }
    });
    res.sendStatus(201);
}