const express = require("express");
const app = express();

app.get('/logout', (req, res) => {
    console.log("logout1.0")
    req.session.destroy((err)=> {
        if(err) console.log(err);
        res.json({ message: 'We hope to see you soon' })
    });
});

module.exports = app;