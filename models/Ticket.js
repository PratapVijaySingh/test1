const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ticketSchema = new Schema({
    name: { type: String, required: false },
 
    lastname: {
         type: String, 
         required: false },
    email: { 
        type: String, 
        required: false },
    telephone: {
         type: String,
          required: false },
    description: {
         type: String, required: false },
    project: { type: String, required: false },
    type: { type: String, required: false },
    status: {
        type: String,
        enum: ['Open', 'Inprogress', 'Resolved'],
        default:"Open"
    },
    toegewezen: { type: String, default: "" },
    opmerking:{ type:String, default: "" }

}, {
    timestamps: true,
});




const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
