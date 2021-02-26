const express = require('express')
const app = express();
const fs = require('fs');
const { port, accountSid, authToken } = require('./src/config');
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    client.messages
        .create({
            body: 'Teste de envio de mensagem node.',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+556181461449'
        })
        .then(message => console.log(message.sid))
        .done();
    res.send('Hello World!')
})

app.post('/received', (req, res) => {
    const { body } = req;
    console.log('body received message => ', body);
    console.log('req received message => ', req);
    res.send({ message: 'received' })
})

app.post('/status', (req, res) => {
    console.log('received message status is changed => ', req);
    res.send({ message: 'received status' })
})

app.listen(port, () => {
    console.log(`rodando em http://localhost:${port}`)
})