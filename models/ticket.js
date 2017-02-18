var mongoose = require('mongoose')

var ticketSchema = new mongoose.Schema({
    hackerName: String,
    hackerPhoneNumber: String,
    hackerLocation: String,
    problemTitle: String,
    problemDescription: String,
    problemTags: [String],
    projectName: String,
    status: String
});

module.exports = mongoose.model("Ticket", ticketSchema);