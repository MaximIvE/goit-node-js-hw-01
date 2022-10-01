const {listContacts, getContactById, removeContact, addContact} = require('./contacts.js');
const argv = require("yargs").argv;

const invokeAction = async({action, id, name="", email="", phone=""}) => {
    switch(action) {
        case "list":   
            const allContacts = await listContacts();
            console.table(allContacts);
            break;

        case "get":   
            const oneContact = await getContactById(id);
            console.log(oneContact);
            break;

        case "remove":   
            const removedContact = await removeContact(id);
            console.log(removedContact);
            break;

        case "add":     
            const result = await addContact(name, email, phone);  
            console.log(result);
            break;

            
        default: console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(argv);