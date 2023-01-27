import {
  Client,
  Events,
  Interaction,
  GatewayIntentBits,
  IntentsBitField,
  Message,
  MessageCreateOptions,
  MessagePayload,
  MessageReplyOptions,
  EmbedBuilder
} from 'discord.js'
import Utils from './utils'

require('dotenv').config()

const adminId = process.env.ADMIN_ID
let i = 0

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.DirectMessages
  ],
  partials: []
})

// client.login(""); // fredinho
client.login(process.env.DISCORD_TOKEN_PRODUCTION)

// client.on('voiceStateUpdate', voiceStateUpdate)
client.on(Events.MessageCreate, message)
// client.on('guildMemberAdd', guildMemberAdd)
client.on('ready', ready)

function message(message: Message) {
  // console.log('oi')
  if (message.content.startsWith('!')) {
    switch (message.content) {
      case '!ping':
        message.channel.send('pong!')
        break
      case '!1':
        console.log('-----------')
        console.log('-----------')
        console.log('-----------')
        console.log('-----------')
        console.log(message)
        break
      case '!2':
        break
      case '!3':
        console.log(message.member)
        break
      case '!4':
        console.log(message.member.guild)
        break
      case '!5':
        console.log(message.member.guild.roles)
        break
      case '!6':
        console.log(message.member.roles)
        break
      // case "!addfriend": message.author.addFriend(); break;
      case '!meuid':
        message.reply(message.author.id)
        break
      case '!channels':
        console.log(client.channels)
        break
      case '!direct':
        message.author.send('Oi!')
        break
      case '!doc':
        message.author.send(
          'https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/frequently-asked-questions.md'
        )
        message.author.send('https://discord.js.org/#/docs/main/stable/general/welcome')
        break
      case '!embed':
        const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle('Some title')
          .setURL('https://discord.js.org/')
          .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
          .setDescription('Some description here')
          .setThumbnail('https://i.imgur.com/AfFp7pu.png')
          .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true }
          )
          .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
          .setImage('https://i.imgur.com/AfFp7pu.png')
          .setTimestamp()
          .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

        message.channel.send({
          embeds: [exampleEmbed]
        })
        break
      default:
        break
    }

    // message.delete();
  }

  if (/^post [0-9]{4,6}$/.test(message.content)) {
    const id = message.content.split(' ')[1]

    try {
      Utils.getFromApi('post/' + id, (r) => {
        if (r.data === false || r.data.id === undefined) {
          message.reply('Post não encontrado')
          return
        }

        const embed = Utils.createEmbedFromPost(r.data)

        message.channel.send({
          embeds: [embed]
        })
      })
    } catch (error) {
      message.reply('Não foi possível obter as informações do post. Tente novamente em alguns instantes.')
    }
  }
}

/**
 * Cron
 */
function ready() {
  console.log('iniciado')
  //   setInterval(function () {
  //     console.log(i++)
  //   }, 2000)
}
