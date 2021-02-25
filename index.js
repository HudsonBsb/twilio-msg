const express = require('express')
const app = express();
const { port, accountSid, authToken } = require('./src/config');
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    const addrs = client.accounts;
    console.log('twilio addrs => ', addrs);
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

app.listen(port, () => {
    console.log(`rodando em http://localhost:${port}`)
})