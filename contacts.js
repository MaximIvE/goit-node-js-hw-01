const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    try{
      const data = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(data);
    }catch(error){
      console.log(error.message); 
      return null;
    }
  };

  async function getContactById(contactId) {
    const id = contactId.toString();
    const result = await listContacts();
    if(!result) return null;
    const contact = result.find(item => item.id === id);
    if(!contact) console.log("Contact not found");
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
  
  
  async function addContact({name="", email="", phone=""}) {
    

    const result = await listContacts();
    if(!result) console.log("Failed to read previous contacts. Contacts will be overwritten.");
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