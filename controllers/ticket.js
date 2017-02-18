var tickets = require('../models/ticket');

exports.view_all = function(req, res) {
    tickets.find(function(err, tickets) {
        res.render('ticket/view-all', {
            title: "All Tickets",
            tickets: tickets
        });
    });
}

exports.view = function(req, res) {
    tickets.findOne({"ticketSchema._id": req.params.id}, function(err, ticket) {
        if (ticket) {
            res.render('ticket/view', {
                title: ticket.problemTitle
            });
        }
    });
}

exports.create = function(req, res) {
    res.render('ticket/create');
}

exports.submit = function(req, res) {
    var ticket = Ticket();
    ticket.hackerName = req.body.hackerName;
    ticket.hackerPhoneNumber = req.body.hackerPhoneNumber;
    ticket.hackerLocation = req.body.hackerLocation;
    ticket.problemTitle = req.body.problemTitle;
    ticket.problemDesrcription = req.body.problemDescription;

    company.save(function(err) {
        if (err) {
            res.send(err);
        }
    });
    res.send(201);
}