const express = require('express')
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContacts,
    deleteContact
} = require('../../controllers/api/contactsController')


const router = express.Router()

router.get('/', getContacts)
router.post('/', createContact)
router.delete('/', deleteContacts)
router.get('/:slug', getContact)
router.patch('/:slug', updateContact)
router.delete('/:slug', deleteContact)

module.exports = router
