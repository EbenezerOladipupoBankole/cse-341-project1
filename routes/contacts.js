const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll); // #swagger.tags = ['Contacts']

router.get('/:id', contactsController.getSingle); // #swagger.tags = ['Contacts']

router.post('/', contactsController.createContact); // #swagger.tags = ['Contacts']
/*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'All fields are required to create a new contact.',
        schema: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            favoriteColor: 'Blue',
            birthday: '1990-01-25'
        }
    }
*/

router.put('/:id', contactsController.updateContact); // #swagger.tags = ['Contacts']
/*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'All fields are required to update a contact.',
        schema: {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            favoriteColor: 'Green',
            birthday: '1992-05-15'
        }
    }
*/

router.delete('/:id', contactsController.deleteContact); // #swagger.tags = ['Contacts']

module.exports = router;