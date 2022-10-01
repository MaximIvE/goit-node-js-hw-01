const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    try{
      const data = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(data);
    }catch(error){
      console.log('\x1b[33m%s\x1b[0m', error.message);
      return null;
    }
  };

  async function getContactById(id) {
    const result = await listContacts();
    if(!result) return null;
    const contact = result.find(item => item.id == id);
    if(!contact) console.warn("\x1B[31m Contact not found");
    return contact || null;
  };
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const removedContact = await getContactById(contactId);
    
    if (!contacts || !removedContact) return null;
    const id = contactId.toString();

    const newContacts = contacts.filter(item => item.id !== id);
    const newContactsStr = JSON.stringify(newContacts, null, 2);

    fs.writeFile(contactsPath, newContactsStr );
    return removedContact;
  };
  
  async function addContact(name, email, phone) {
    const result = await listContacts();
    if(!result) console.warn("\x1b[33m%s\x1b[0m Failed to read previous contacts. Contacts will be overwritten.");
    const id = (Number(result[result.length - 1].id) + 1).toString() || 1;
    const data = {id, name, email, phone};
    const newContacts = result ? [...result, data] : [data];
    const newContactsStr = JSON.stringify(newContacts, null, 2);
    fs.writeFile(contactsPath, newContactsStr );
    return data;
  };

  const contactsFunctions = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };

  module.exports = contactsFunctions;