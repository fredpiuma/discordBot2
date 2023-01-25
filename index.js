"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _discord = require("discord.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('dotenv').config();
const https = require('https');
const adminId = process.env.ADMIN_ID;
let i = 0;
const client = new _discord.Client({
  intents: [_discord.GatewayIntentBits.Guilds, _discord.GatewayIntentBits.GuildMessages, _discord.GatewayIntentBits.GuildMessageReactions, _discord.GatewayIntentBits.MessageContent, _discord.IntentsBitField.Flags.GuildPresences, _discord.IntentsBitField.Flags.GuildMembers, _discord.IntentsBitField.Flags.Guilds, _discord.IntentsBitField.Flags.DirectMessages],
  partials: []
});

// client.login(""); // fredinho
client.login(process.env.DISCORD_TOKEN_PRODUCTION);

// client.on('voiceStateUpdate', voiceStateUpdate)
client.on(_discord.Events.MessageCreate, message);
// client.on('guildMemberAdd', guildMemberAdd)
client.on('ready', ready);
function message(message) {
  console.log('oi');
  if (message.content.startsWith('!')) {
    switch (message.content) {
      case '!ping':
        message.channel.send('pong!');
        break;
      case '!1':
        console.log('-----------');
        console.log('-----------');
        console.log('-----------');
        console.log('-----------');
        console.log(message);
        break;
      case '!2':
        break;
      case '!3':
        console.log(message.member);
        break;
      case '!4':
        console.log(message.member.guild);
        break;
      case '!5':
        console.log(message.member.guild.roles);
        break;
      case '!6':
        console.log(message.member.roles);
        break;
      // case "!addfriend": message.author.addFriend(); break;
      case '!meuid':
        message.reply(message.author.id);
        break;
      case '!channels':
        console.log(client.channels);
        break;
      case '!direct':
        message.author.send('Oi!');
        break;
      case '!doc':
        message.author.send('https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/frequently-asked-questions.md');
        message.author.send('https://discord.js.org/#/docs/main/stable/general/welcome');
        break;
      case '!embed':
        const exampleEmbed = new _discord.EmbedBuilder().setColor(0x0099ff).setTitle('Some title').setURL('https://discord.js.org/').setAuthor({
          name: 'Some name',
          iconURL: 'https://i.imgur.com/AfFp7pu.png',
          url: 'https://discord.js.org'
        }).setDescription('Some description here').setThumbnail('https://i.imgur.com/AfFp7pu.png').addFields({
          name: 'Regular field title',
          value: 'Some value here'
        }, {
          name: '\u200B',
          value: '\u200B'
        }, {
          name: 'Inline field title',
          value: 'Some value here',
          inline: true
        }, {
          name: 'Inline field title',
          value: 'Some value here',
          inline: true
        }).addFields({
          name: 'Inline field title',
          value: 'Some value here',
          inline: true
        }).setImage('https://i.imgur.com/AfFp7pu.png').setTimestamp().setFooter({
          text: 'Some footer text here',
          iconURL: 'https://i.imgur.com/AfFp7pu.png'
        });
        message.channel.send({
          embeds: [exampleEmbed]
        });
        break;
      default:
        break;
    }

    // message.delete();
  }

  if (/^post [0-9]{4,6}$/.test(message.content)) {
    const id = message.content.split(' ')[1];
    _axios.default.get(`${process.env.API_URI}post/${id}`).then(r => {
      if (r.data === false) {
        message.reply('Post não encontrado');
        return;
      }
      try {
        const {
          assunto,
          texto,
          data,
          datetime,
          agendado,
          cliente,
          id,
          planejamento,
          referencia,
          status,
          alteracao_extra,
          alteracao_imagem,
          alteracao_texto,
          fotos,
          stories,
          videos
        } = r.data;
        const exampleEmbed = new _discord.EmbedBuilder();
        const fields = [];
        exampleEmbed.setColor(0x0099ff);
        exampleEmbed.setTitle(assunto.length > 1 ? assunto : 'sem assunto');
        if (referencia.length > 1) exampleEmbed.setURL(referencia);
        exampleEmbed.setDescription(texto);
        exampleEmbed.setImage(fotos[0]);
        // exampleEmbed.setTimestamp(new Date(datetime))
        if (alteracao_imagem.length > 0) {
          fields.push({
            name: 'Alteração na imagem',
            value: alteracao_imagem
          });
        }
        if (alteracao_texto.length > 0) {
          fields.push({
            name: 'Alteração no texto',
            value: alteracao_texto
          });
        }
        fields.push({
          name: 'Cliente',
          value: cliente.nome,
          inline: true
        });
        fields.push({
          name: 'Planejamento',
          value: planejamento.titulo,
          inline: true
        });
        fields.push({
          name: 'Data',
          value: data,
          inline: true
        });
        exampleEmbed.addFields(fields);
        message.channel.send({
          embeds: [exampleEmbed]
        });
      } catch (error) {
        message.reply('Não foi possível exibir as informações deste post');
      }
      try {
        message.delete();
      } catch (error) {}
    });

    // message.reply('Obtendo informações do post '+message.content.split(" ")[1]);
  }
}

/**
 * Cron
 */
function ready() {
  //   setInterval(function () {
  //     console.log(i++)
  //   }, 2000)
}