import WhatsAppWebPkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal'

const { Client, LocalAuth } = WhatsAppWebPkg;

const client = new Client({
    authStrategy: new LocalAuth({ 
        dataPath: '_tokens', 
        clientId: "client-one" 
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    if (message.body === '!hello') {
        message.reply('hello world');
    }
});

client.initialize();
