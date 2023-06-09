require('dotenv').config();
const express = require('express');
const app = express();
const Discord = require('discord.js');
const bodyParser = require("body-parser");

const { connectToMindsDBCloud,analyzeLanguageEngToFreTranslation,analyzeLanguageFreToEngTranslation, analyzeLanguageSpaToEngTranslation} = require("./dispatcher/mindsdb.js")


const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent
]})



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Discord bot is running!');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().startsWith('!englishtofrench')) {
    const query = message.content.slice(16).trim();
    await connectToMindsDBCloud();
    const response = await analyzeLanguageEngToFreTranslation(query);    

    console.log("result----->",response);
 
    message.reply(JSON.stringify(response.rows[0].pred));
  } else if (message.content.toLowerCase().startsWith('!frenchtoenglish')) {
    const query = message.content.slice(16).trim();
    await connectToMindsDBCloud();
    const response = await analyzeLanguageFreToEngTranslation(query);    
 
    message.reply(JSON.stringify(response.rows[0].english));
  } else if (message.content.toLowerCase().startsWith('!spanishtoenglish')) {
    const query = message.content.slice(17).trim();
    await connectToMindsDBCloud();
    const response = await analyzeLanguageSpaToEngTranslation(query);    

    console.log("result----->",response);
 
    message.reply(JSON.stringify(response.rows[0].english));
  } 
});

client.login(process.env.TOKEN);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app is listening on port ${PORT}!`);
});
