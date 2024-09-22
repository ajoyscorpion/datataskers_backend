const express = require('express')
const router = express.Router()
const contactsController = require('../Controller/contactsController')

// get all contacts 
router.get("/allContacts",contactsController.getAllContacts)

// get a contact
router.get("/contact/:id",contactsController.getContact)

// send message
router.post('/sendMessage',contactsController.sendMessage)

// get all messages
router.get('/allMessages',contactsController.getAllMessages)

module.exports = router