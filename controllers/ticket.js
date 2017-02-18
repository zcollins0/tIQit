var tickets = require('../models/ticket');

exports.view_all = function(req, res) {

}

exports.view = function(req, res) {
    tickets.findOne({"ticketSchema._id": req.params.id}, function(err, ticket) {
        if (ticket) {
            
        }
    });
}

exports.create = function(req, res) {

}

exports.submit = function(req, res) {

}