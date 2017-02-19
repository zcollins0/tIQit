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
            tickets: tickets,
            title: "View-all"
        });
        
        
        //res.json({tickets:tickets});
    });
}

exports.view = function(req, res) {
    Ticket.findById(req.query.id, function(err, ticket) {
        if (ticket) {
            res.render('ticket/view', {ticket, title: ticket.problemTitle});
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
    res.render('ticket/create', {title: "Create new ticket"});
}

exports.submit = function(req, res) {
    // Check for missing fields
    req.checkBody('hackerName', 'No hacker name provided').len(1, 1000);
    req.checkBody('hackerLocation', 'No location provided').len(1,1000);
    req.checkBody('problemTitle', 'No title submitted').len(1,1000);
    req.checkBody('problemDescription', 'No problem description provided').len(1, 10000);

    req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
            // Render a warning to the user for more data.
            res.status(400).render('ticket/create', { errors: result.array(), title: "You goofed" });
            return;
        } else {
            // The entry is good, continue with saving the item
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

            ticket.save(function (err, savedTicket) {
                if (err) {
                    res.send(err);
                }
                res.redirect('view?id=' + savedTicket.id);
            });
        }
    })
}

exports.update = function(req, res) {
    Ticket.findById(req.query.id, function(err, ticket) {
        if (ticket) {
            ticket.status = req.body.status;
            ticket.save(function (err, savedTicket) {
                if (err) {
                    res.send(err);
                }
                res.redirect('view?id=' + savedTicket.id);
            });
        }
    });
}
