const Lead = require('../models/lead');
const { Parser } = require('json2csv');

exports.getLeadsSummary = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const leadsByChannelPartner = await Lead.aggregate([
      { $group: { _id: '$channelPartnerCode', count: { $sum: 1 } } },
    ]);
    const leadsBySource = await Lead.aggregate([
      { $group: { _id: '$leadSource', count: { $sum: 1 } } },
    ]);
    res.status(200).json({ totalLeads, leadsByChannelPartner, leadsBySource });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.exportLeadsToCSV = async (req, res) => {
  try {
    const leads = await Lead.find({});
    const fields = [
      'channelPartnerCode',
      'leadName',
      'contactNumber',
      'emailId',
      'leadSource',
      'leadInterest',
      'additionalNotes',
      'createdAt',
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(leads);
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
