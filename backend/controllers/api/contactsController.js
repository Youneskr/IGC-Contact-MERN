const Contact = require('../../models/contactSchema')
const v = require('voca')

const getContacts = async (req, res) => {
    const contacts = await Contact.find().sort({updatedAt : -1})    

    // if (contacts.length === 0) res.status(400).json({error: 'There is no contacts'})

    res.json(contacts)
}

const getContact = async (req, res) => {
    const slug = req.params.slug


    const contact = await Contact.findOne({slug})

    if (!contact) return res.status(400).json({error: `Le contact ${slug} n'existe pas`})

    res.json(contact)
}

const createContact = async (req, res) => {

    if (!req.body.sponsor) return res.status(400).json({ error: 'Veuillez saisir le nom du contact' })

    req.body.sponsor = v.titleCase(req.body.sponsor)

    const slug = v.slugify(req.body.sponsor)

    const exist = await Contact.findOne({slug})

    if (exist) return res.status(400).json({
            error: 'Ce contact exist deja',
        })
    
    if (!req.body.img) req.body.img = 'https://idendate.sirv.com/isitcom_google_club/igc-contacts/default%20picture.png'

    const contact = await Contact.create({slug, favorite: false,...req.body})

    res.json(contact)
}

const updateContact = async (req, res) => {

    const slug = req.params.slug

    const exist = await Contact.findOne({slug})

    if (!exist) return res.status(400).json({error: `Le contact ${slug} n'existe pas`})

    Object.keys(req.body).map(key => {
        if (req.body[key]) exist[key] = req.body[key]
    })

    await Contact.updateOne({ slug }, { $set: exist })
    
    const contact = await Contact.findOne({slug})

    res.json(contact)
}

const deleteContacts = async (req, res) => {

    await Contact.deleteMany()
    res.json(`Vos contacts ont été supprimer`)
}

const deleteContact = async (req, res) => {
    const slug = req.params.slug

    const exist = await Contact.findOne({slug})

    if (!exist) return res.status(400).json({error: `Le contact ${slug} n'existe pas`})

    await Contact.deleteOne({slug})

    res.json(`${slug} a été supprimer`)
}


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContacts,
    deleteContact
}