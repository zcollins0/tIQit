var tickets = require('../models/ticket');

exports.view_all = function(req, res) {
    tickets.find(function(err, tickets) {
        res.render('/ticket/view-all', {
            title: "All Tickets",
            tickets: tickets
        });
    });
}

exports.view = function(req, res) {
    tickets.findOne({"ticketSchema._id": req.params.id}, function(err, ticket) {
        if (ticket) {
            res.render('/ticket/view', {
                title: ticket.problemTitle
            });
        }
    });
}

exports.create = function(req, res) {

}

exports.submit = function(req, res) {

}