const contacts = require('../models/contact.json')
const fs = require('fs')
const path = require('path')
const client = require('../twilio/twilio')
const messages = require('../models/message.json')

// Get all contacts
exports.getAllContacts =(req,res) => {
    try {
        res.status(200).json(contacts)
    } catch (error) {
        res.status(400).json("Failed to get all contacts")
    }
}

// get specified contact
exports.getContact =(req,res) => {
    const {id} = req.params
    console.log(id);
    try {
        const contact = contacts.find(contacts => contacts.id === Number(id))
        console.log(contact);
        res.status(200).json(contact)
    } catch (error) {
        res.status(400).json("Failed to get the Contact")
    }
}

// get all messages

exports.getAllMessages = async(req,res) => {
    try {
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json('Failed to get Messages')
    }
}

// send message
exports.sendMessage = async(req,res) => {

    const body = req.body
    console.log(body);

    try {
        const message = await client.messages.create({
            body: `Hi ${body.firstName}, your OTP is ${body.otp}`,
            to: body.phone,  // Text this number
            from: process.env.TWILIO_NUMBER // From a valid Twilio number
        })

        const messageData = {
            contact: `${body.firstName} ${body.lastName}`,
            phone: body.phone,
            otp:body.otp,
            timestamp: new Date().toISOString()
        };

        console.log(messageData);

        const filePath = path.join(__dirname,'../models/message.json')
        let messages = []

        console.log(messages);
        console.log("Bla");

        if (fs.existsSync(filePath)){
            const fileData = fs.readFileSync(filePath, 'utf-8');
            // If file is not empty, parse the JSON
            if (fileData) {
                try {
                    messages = JSON.parse(fileData);
                } catch (error) {
                    console.error('Failed to parse message.json:', error.message);
                    messages = []; // Reset to empty if parsing fails
                }
            }
        }

        console.log("Na");

        messages.push(messageData)

        console.log("NaNa");

        fs.writeFileSync(filePath,JSON.stringify(messages,null,2))
        console.log("Message data: ", messageData);

        res.status(200).json({ message: 'OTP sent!'});

    } catch (error) {
        console.error('Failed to send OTP:', error.message);
        return res.status(400).json({ message: 'Failed to send OTP', error: error.message });
    }

}