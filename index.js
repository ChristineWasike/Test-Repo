'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// FACEBOOK Webhook

const request = require('request');
// Imports dependencies and set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // creates express http server




// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
        console.log("hey")
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
        console.log("nah")
    }

});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = "<Adopt>"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
            console.log('mfkmf')
        }
    }
});

// Deploying to Heroku
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// server index page
app.get("/", function (req, res) {
    if (req.query['hub.verify_token'] === "<Adopt>") {
        return res.send(req.query['hub.challenge'])
        console.log("Hey you!")
    }
    res.send('wrong token')
});

//NOTE: PSID: unique page-scoped ID

// handles messages events
function handleMessages(sender_psid, received_message) {

}

// handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {

}
//Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));