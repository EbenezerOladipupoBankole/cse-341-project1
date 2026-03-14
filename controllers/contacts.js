const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const lists = await mongodb.getDatabase().db('cse341').collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Must use a valid contact id to find a contact.'});
        return;
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('cse341').collection('contacts').findOne({ _id: userId });
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields (firstName, lastName, email, favoriteColor, birthday) are required.' });
    }
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb.getDatabase().db('cse341').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ insertedId: response.insertedId });
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid contact id to update a contact.'});
  }
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required for an update.' });
  }
  try {
    const userId = new ObjectId(req.params.id);
    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const response = await mongodb.getDatabase().db('cse341').collection('contacts').replaceOne({ _id: userId }, contact);
    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid contact id to delete a contact.'});
  }
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('cse341').collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};