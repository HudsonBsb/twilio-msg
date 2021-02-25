const express = require('express')
const app = express();
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

app.get('/received', (req, res) => {
    console.log('received message => ', addrs);
})

app.get('/status', (req, res) => {
    console.log('received message status is changed => ', req);
})

app.listen(port, () => {
    console.log(`rodando em http://localhost:${port}`)
})