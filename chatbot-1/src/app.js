import venom from 'venom-bot'
import path from 'path'

const __dirname = path.resolve();

const sessionName = 'sessionName';
const catchQR = undefined;
const statusFind = undefined;
const options = {
    multidevice: false, // for version not multidevice use false.(default: true)
    mkdirFolderToken: path.join(__dirname, 'node_modules'), //folder directory tokens
    headless: true, // Headless chrome
    useChrome: false, // If false will use Chromium instance
    debug: false, // Opens a debug session
};

venom
    .create(sessionName, catchQR, statusFind, options)
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    client.onMessage(async (message) => {
        if (message.isGroupMsg) {
            return;
        }

        if (message.body === '!hi') {
            await client.sendText(message.from, 'Hello!')
            return;
        }

        if (message.body === '!image') {
            console.log('oii')
            const pathImg = path.join(__dirname, 'src', 'imgs', 'image_borat.jpg');
            await client.sendImage(message.from, pathImg);
            return;
        }

        if (message.body === '!audio') {
            const pathAudio = path.join(__dirname, 'src', 'audio', 'hey_joe.mp3');
            await client.sendVoice(message.from, pathAudio);
            return;
        }

        if (message.body === '!pdf') {
            const pathPDF = path.join(__dirname, 'src', 'pdf', 'pdf_fake.pdf');
            await client.sendFile(message.from, pathPDF, 'PDF fake')
            return;
        }

        if (message.body === '!location') {
            const latitude = '-20.8130342';
            const longitude = '-49.3801624';
            await client.sendLocation(message.from, latitude, longitude, 'Minha cidade')
            return;
        }

        if (message.body === '!buttons') {
            const title = 'Está gostando do curso?';
            const description = 'Botões de teste';
            const buttons = [
                {
                    "id": "1",
                    "text": "Sim"
                },
                {
                    "id": "2",
                    "text": "Não"
                }
            ];
            await client.sendButtons(message.from, title, buttons, description);
            return;
        }

        if (message.body === '!list') {
            let sections = [
                {
                    title: "Section 1",
                    rows: [
                        {
                            rowId: "1",
                            title: "Element 1",
                            description: "Description 1",
                        },
                        {
                            rowId: "2",
                            title: "Element 2",
                            description: "Description 2",
                        },
                    ]
                },
                {
                    title: "Section 2",
                    rows: [
                        {
                            rowId: "3",
                            title: "Element 3",
                            description: "Description 3",
                        },
                        {
                            rowId: "4",
                            title: "Element 4",
                            description: "Description 4",
                        },
                    ]
                },
            ];
            await client.sendListMenu(message.from, "Title", "Description", "Choose", sections)
        }
    })
}