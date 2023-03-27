const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));//never changed this lol

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//rainbow role

const Discord = require('discord.js'),
    client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } }),
    roleColorSwitchDelay = 60000; //ms
var timer;

client.once('ready', () => { console.log('Bot ready!'); });

client.on("message", message => {
    if (message.content == "not sus command") {
        message.delete();
        rainbowRole(message);
        message.channel.send("Rainbow role online!");
    } else if (message.content == "shutdown") { clearInterval(timer); }
});

function rainbowRole(message) {//Alright this one is just the typical 7 colour swaps
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs)), 
        role = message.guild.roles.cache.get("823033367494393897"), 
        colors = ['#FF0000', '#FF5F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    role.edit({ color: "#000000" });
    message.channel.send(`Targeted: \`${role.name}\`, ID \`${role.id}\``);
    var lastChange = 0,
        i = 0;
    timer = setInterval(() => {
        if (Date.now() - lastChange >= roleColorSwitchDelay) {
            lastChange = Date.now();
            role.edit({ color: colors[i++ % 7] });
        }
    }, roleColorSwitchDelay);
}

client.login();//Token goes here
