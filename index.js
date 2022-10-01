const {listContacts, getContactById, removeContact, addContact} = require('./contacts.js');

const fileOperations = async({action, contactId, data}) => {
    switch(action) {
        case "getAll":   
            const allContacts = await listContacts();
            console.log(allContacts);
            break;

        case "getById":   
            const oneContact = await getContactById(contactId);
            console.log(oneContact);
            break;

        case "removeById":   
            const removedContact = await removeContact(contactId);
            console.log(removedContact);
            break;

        case "add":     
            const result = await addContact(data);  
            console.log(result);
            break;

            
        default: console.log("Unkown action");
    }
};

// fileOperations({action: "getAll"});
// fileOperations({action: "getById", contactId: 11});
fileOperations({action: "removeById", contactId: 11});

// fileOperations({action: "add",
// data: {
//         name: 'Alec Howard',
//         email: 'Donec.elementum@scelerisquescelerieler',
//         phone: '(748) 206-2688'
// }
// });
