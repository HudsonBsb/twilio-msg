const express = require('express')
const app = express();
const router = express.Router();
const fs = require('fs');
const { port, accountSid, authToken } = require('./src/config');
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;
const goodBoyUrl = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?'
  + 'ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';


client.chat.services('IS4940e4b5a0934dc8983df2df549d3acc')
    .update({
        webhookFilters: ['onMessageSent', 'onMessageSend', 'onMessageUpdate', 'onMessageUpdated', 'onMessageRemove', 'onMessageRemoved', 'onChannelAdd', 'onChannelAdded', 'onChannelDestroy', 'onChannelDestroyed', 'onChannelUpdate', 'onChannelUpdated', 'onMemberAdd', 'onMemberAdded', 'onMemberRemove', 'onMemberRemoved', 'onUserUpdate', 'onUserUpdated']
    })
    .then(service => console.log('service return console => ', service.friendlyName));

router.get('/', (req, res) => {
    client.messages
        .create({
            body: 'Teste de envio de mensagem node.',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+556181461449',
            mediaUrl: 'https://i.pinimg.com/originals/0a/1f/82/0a1f820e29719c7b67e9d5aa44241155.png'
        })
        .then(message => console.log(message.sid))
        .done();
    res.send('Hello World!')
})

router.post('/received', (req, res) => {
    const { body } = req;

    let message;

    if (body.NumMedia > 0) {
        message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
        message.media(goodBoyUrl);
    } else {
        message = new MessagingResponse().message('Send us an image!');
    }
    console.log('message received message => ', message);
    console.log('body received message => ', body);
    // console.log('req received message => ', req);
    res.send({ message: 'received' })
})

router.post('/status', (req, res) => {
    const { body } = req;
    console.log('body received message status is changed => ', body);
    res.send({ message: 'received status' })
})

app.use(router);

app.listen(port, () => {
    console.log(`rodando em http://localhost:${port}`)
})