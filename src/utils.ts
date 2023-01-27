import axios from 'axios'
import { EmbedBuilder } from 'discord.js'

export default class Utils {
  static createEmbedFromPost(postData): EmbedBuilder {
    const {
      id,
      assunto,
      texto,
      data,
      datetime,
      agendado,
      cliente,
      planejamento,
      referencia,
      status,
      alteracao_extra,
      alteracao_imagem,
      alteracao_texto,
      fotos,
      stories,
      videos
    } = postData
    const embedPost = new EmbedBuilder()
    const fields = []
    embedPost.setColor(0x0099ff)
    embedPost.setTitle(assunto.length > 1 ? assunto : 'sem assunto')
    if (referencia.length > 1) embedPost.setURL(referencia)
    if (texto) embedPost.setDescription(texto)
    if (fotos.length) embedPost.setImage(fotos[0])
    // exampleEmbed.setTimestamp(new Date(datetime))
    if (alteracao_imagem?.length > 0) {
      fields.push({ name: 'Alteração na imagem', value: alteracao_imagem })
    }
    if (alteracao_texto?.length > 0) {
      fields.push({ name: 'Alteração no texto', value: alteracao_texto })
    }
    fields.push({ name: 'Cliente', value: cliente.nome, inline: true })
    fields.push({ name: 'Planejamento', value: planejamento.titulo, inline: true })
    fields.push({ name: 'Data', value: data, inline: true })
    fields.push({ name: 'Post ID', value: id, inline: true })
    fields.push({ name: 'Planejamento ID', value: planejamento.id, inline: true })

    embedPost.addFields(fields)
    return embedPost
  }

  static getFromApi(endpoint, callback) {
    const requestURL = `${process.env.API_URI}${endpoint}`
    axios.get(requestURL).then(callback)
  }
}
