const Lead = require('../models/lead');

exports.createLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({});
    res.status(200).json(leads);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
