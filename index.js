const contactsOperations = require('./contacts')

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts()
      console.log(contacts)
      break;
    case 'get':
      const contact = await contactsOperations.getContactById(id)
      if (!contact) {
        throw new Error(`Contact with ${id} not found`)
      }
      console.log(contact)
      break;
    case 'add':
      const newContact = await contactsOperations.addContact(name, phone, email)
      console.log(newContact)
      break;
    case 'remove':
      const removeContacts = await contactsOperations.removeContact(id)
      console.log(removeContacts)
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: 'list' })

const id = '6'
invokeAction({ action: 'get', id})

// const name = 'Petya'
// const email = 'Petya_Nagibator@i.ua'
// const phone = '66 - 666 - 666'
// invokeAction({ action: 'add', name, phone, email })
// const id = '15971965-8704-4e83-b958-ebac04749186'
// invokeAction({ action: 'remove', id})
