const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'db/contacts.json')

const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
}
const getContactById = async (id) => {
    const contacts = await listContacts()
    const result = contacts.find(el => el.id === id)
    if (!result) {
        return null
    }
    return result
}

const addContact = async (name, phone, email) => {
    const contacts = await listContacts()
    const newContacts = { id: v4(), name, email, phone }
    contacts.push(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContacts
}

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const removeContact = async (id) => {
    const contacts = await listContacts()
    const ind = contacts.findIndex(el => el.id === id)
    if (ind === -1) {
        return console.log('Contact with this id don`t exist');
    }
    const newContacts = contacts.filter((_, index) => index !== ind)
    await updateContacts(newContacts)
    return contacts[ind]
}


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}


