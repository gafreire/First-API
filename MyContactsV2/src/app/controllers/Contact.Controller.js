const ContactRepository = require("../../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query
    const contacts = await ContactRepository.findAll(orderBy)
    response.json(contacts)
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params
    const contact = await ContactRepository.findById(id)
    if(!contact) {
      return response.status(404).json({ error: "User not found"})
    }

    response.json(contact)
  }

  async store(request, response) {
    // Criar um registro
    const { name, email, phone, category_id } = request.body

    const contactExists = await ContactRepository.findByEmail(email)
    if(contactExists) {
      return response.status(400).json({ error: "This email is already in use"})
    }

    const contact = await ContactRepository.create({ name, email, phone, category_id })
    response.json(contact)
  }

  async update(request, response) {
    //Atualizar um registro
    const { id } = request.params
    const { name, email, phone, category_id } = request.body
    const contact = await ContactRepository.findById(id)

    if(!contact) {
      return response.status(404).json({ error: "User not found"})
    }

    const updatedContact = await ContactRepository.update(id, { name, email, phone, category_id })
    response.json(updatedContact)
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params

    await ContactRepository.delete(id)
    response.sendStatus(204)
  }
}

module.exports = new ContactController()