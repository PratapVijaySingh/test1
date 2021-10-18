const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
    username: { type: String,
         required: true,
         unique: true },
 
    email: {
         type: String, 
         required: true ,
         match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
         unique: true
        },
    name: { 
        type: String, 
        required: true },
    lastname: {
         type: String,
          required: true },
    password: {
         type: String, required: true },
    role: { type: String, default: "user" ,enum: ["user", "admin", "superadmin"] },
}
, {
    timestamps: true,
});




const User = mongoose.model('User', userSchema);

module.exports = User;
