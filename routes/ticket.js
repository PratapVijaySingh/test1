const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();
var mongoose = require('mongoose');
const {userAuth, checkRole} = require("../controllers/AuthController")

/* GET home page */
router.post('/create', (req, response, next) => {

  Ticket
    .create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      telephone: req.body.telephone,
      description: req.body.description,
      project: req.body.project,
      type: req.body.type

    })
    .then((response) => {

      response.status(200).json({ "response": "Product sucessfully added" });
    })
    .catch(error => {
      response.json(error);
    });
});

router.get('/hackmydata',  (req, res, next) => {

  let hackedPassword = req.query.user;

  
      res.json(hackedPassword);

    

});

router.get('/allticket',  (req, res, next) => {
  Ticket.find()
    .then(response => {  
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })

});


router.delete('/tickets/:id', (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Ticket.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("then")
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      console.log(err)
      res.status(401).json({message: `You do not have authorisation`});
    })
})

router.get('/ticketsedit/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Ticket.findById(req.params.id)
    .then((response) => {
      
      res.status(200).json({response, message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    })
})

router.post('/ticketsupdate/:id',(req, response, next) => {

  console.log("ticketsupdate")
  Ticket
    .findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      telephone: req.body.telephone,
      description: req.body.description,
      project: req.body.project,
      type: req.body.type,
      status: req.body.status,
      toegewezen:req.body.toegewezen,
      opmerking:req.body.opmerking

    })
    .then((response) => {

      response.status(200).json({ "response": "Product sucessfully added" });
    })
    .catch(error => {
      response.json(error);
    });
});

module.exports = router;
